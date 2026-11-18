/* Exploratory expectations for a single isolated model turn. */
(() => {
  const library = {
    id: "neighborhood-library",
    name: "Neighborhood Library",
    request: {
      document: null,
      phase: "Comprendre",
      focus_id: null,
      scenario_id: null,
      history: [],
      question: "A neighborhood library lends umbrellas to visitors on rainy days. The librarian keeps the umbrellas in a stand by the entrance and records each loan in a notebook. How does this arrangement work, and what would you look at first to understand it?"
    },
    expected: {
      schema: "tria-codex-discovery-v1",
      objects: [
        { name: "Library", kind: null, label: /\b(?:library)\b/ },
        { name: "Librarian", kind: null, label: /\b(?:librarian)\b/ },
        { name: "Visitors", kind: null, label: /\b(?:visitors?|patrons?)\b/ },
        { name: "Umbrellas", kind: null, label: /^(?:the )?(?:umbrellas?)\b(?! (?:stands?|racks?))/ },
        { name: "Umbrella stand", kind: null, label: /\b(?:stands?|racks?)\b/ },
        { name: "Loan notebook", kind: null, label: /\b(?:notebooks?|logbooks?|loans? log)\b/ },
        { name: "Protection from rain", kind: "NEED", label: /\b(?:rain|dry|weather)\b/ },
        { name: "Lending or providing umbrellas", kind: "CAN",
          label: /(?=.*\b(?:umbrellas?)\b)(?=.*\b(?:lends?|lending|loans?|lend out|provid(?:e|ing)|offer(?:s|ing)?)\b)/ }
      ]
    }
  };

  function normalize(label) {
    return label.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  }

  function matchesLabel(object, expected) {
    if (object?.concept_kind !== expected.kind || typeof object.label !== "string") return false;
    const label = normalize(object.label);
    return expected.accepted_labels
      ? expected.accepted_labels.some(value => normalize(value) === label)
      : expected.label.test(label);
  }

  function evaluate(test, response, startingMap = null) {
    const checks = [];
    function check(expectation, passed, observed) {
      checks.push({ expectation, passed, observed });
    }
    const envelope = response.envelope;
    check("Discovery JSON envelope", response.structured === true && envelope?.schema === test.expected.schema,
      envelope?.schema ?? "No structured envelope");
    if (checks[0].passed) {
      try {
        // Reuse the generic patch validator with an empty set of known IDs.
        TriaMapProtocol.validate({ analysis_id: test.id }, {
          schema: "tria-map-response-v2", analysis_id: test.id, answer: envelope.answer,
          tria_instruction_check: envelope.tria_instruction_check, map_patch: envelope.map_patch
        });
        check("JSON structure, IDs and references", true, "Valid");
      } catch {
        check("JSON structure, IDs and references", false, "The response does not satisfy the map JSON contract.");
      }
      const objects = envelope.map_patch?.objects;
      const relations = envelope.map_patch?.relations;
      for (const [label, values, count] of [
        ["Object count", objects, test.expected.object_count],
        ["Relation count", relations, test.expected.relation_count]
      ]) {
        if (count !== undefined) check(`${label} · ${count}`, values?.length === count, values?.length ?? "Missing");
      }
      if (Array.isArray(objects)) {
        const objectIds = new Map();
        for (const expected of test.expected.objects) {
          const matches = objects.filter(object => matchesLabel(object, expected));
          const qualified = matches.filter(object => !expected.category || object.category === expected.category);
          objectIds.set(expected.name, qualified.map(object => object.id));
          check(`${expected.kind || "Object"} · ${expected.name}`,
            expected.count === undefined ? qualified.length > 0 : qualified.length === expected.count,
            matches.length ? matches.map(({ id, label, category }) => ({ id, label, category })) : "No matching English label");
          if (startingMap) {
            const previous = startingMap.objects.filter(object => matchesLabel(object, expected));
            check(`Same Object ID · ${expected.name}`,
              previous.length === 1 && qualified.length === 1 && previous[0].id === qualified[0].id,
              { before: previous.map(object => object.id), after: qualified.map(object => object.id) });
          }
        }
        for (const expected of test.expected.forbidden_objects ?? []) {
          const matches = objects.filter(object => matchesLabel(object, expected));
          check(`No ${expected.kind || "Object"} · ${expected.name}`, matches.length === 0,
            matches.map(object => object.label));
        }
        for (const [expectedRelations, required] of [
          [test.expected.relations ?? [], true],
          [test.expected.forbidden_relations ?? [], false]
        ]) {
          for (const expected of expectedRelations) {
            const origins = objectIds.get(expected.origin) ?? [];
            const represented = objectIds.get(expected.represented) ?? [];
            const matches = Array.isArray(relations) ? relations.filter(relation => relation?.type === expected.type &&
              origins.includes(relation.origin_object_id) && represented.includes(relation.represented_object_id)) : [];
            check(`${required ? "" : "No "}${expected.type} attribution · ${expected.origin} → ${expected.represented}`,
              required ? matches.length > 0 : matches.length === 0, matches.map(relation => relation.id));
          }
        }
      }
    }
    const expected = test.expected;
    const hasMapChecks = expected.object_count !== undefined || expected.relation_count !== undefined ||
      expected.objects.length > 0 || expected.forbidden_objects?.length > 0 || expected.relations?.length > 0 ||
      expected.forbidden_relations?.length > 0 ||
      Boolean(startingMap);
    return {
      test: test.name, reference: test.reference,
      coverage: hasMapChecks ? "Exchange format and map data" : "Exchange format only",
      conclusion: checks.every(check => check.passed) ? "Pass" : "Fail", checks
    };
  }

  function evaluateFollowUp(test, turns) {
    const identity = test.follow_up.preserve_object_ids === true;
    const secondCase = { ...test, expected: { ...test.expected,
      objects: test.follow_up.expected_objects ?? test.expected.objects } };
    const checks = turns.flatMap((response, index) => {
      const prefix = `Turn ${index + 1} · `;
      const { checks: turnChecks } = evaluate(index === 0 ? test : secondCase, response);
      const prefixed = turnChecks.map(check => ({ ...check, expectation: prefix + check.expectation }));
      if (identity) return prefixed;
      const report = response.envelope?.tria_instruction_check?.message;
      const observed = typeof report === "string" ? normalize(report) : "";
      return [
        {
          expectation: prefix + "Recognized the instruction to identify distinct Objects",
          passed: /\b(?:objects?|entit(?:y|ies))\b/.test(observed) &&
            /\bidentif\w*\b/.test(observed),
          observed: report ?? "No instruction reported"
        },
        ...prefixed
      ];
    });
    if (identity) {
      for (const expected of test.expected.objects) {
        const ids = turns.map(turn => {
          const objects = turn.envelope?.map_patch?.objects;
          return Array.isArray(objects) ? objects.filter(object => matchesLabel(object, expected))
            .map(object => object.id) : [];
        });
        checks.push({
          expectation: `Same Object ID · ${expected.name}`,
          passed: ids[0].length === 1 && ids[1].length === 1 && ids[0][0] === ids[1][0],
          observed: ids
        });
      }
    }
    return { test: test.follow_up.name, reference: test.reference,
      coverage: identity ? "Exchange format and Object IDs" : "Exchange format, map data and instruction self-report",
      conclusion: checks.every(check => check.passed) ? "Pass" : "Fail", checks };
  }

  window.TriaMethodTests = { library, evaluate, evaluateFollowUp };
})();
