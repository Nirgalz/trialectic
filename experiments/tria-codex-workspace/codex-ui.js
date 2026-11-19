/* Development workspace adapter for the local Codex CLI (no API key).
   This page does not connect to, or mirror, the current chatgpt.com thread. */
(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const messages = [];
  let sourceRevision = null, pending = false;
  let methodAcknowledged = null;
  let activeInstructionVersion = null;
  const instructionSelection = $("instruction-version-selection");
  // This adapter alone knows Codex CLI. The reference map only displays a generic status.
  const connectionLabels = {
    checking: {
      fr: ["Codex CLI · vérification…", "Vérification locale de Codex CLI en cours."],
      en: ["Codex CLI · checking…", "Checking the local Codex CLI."]
    },
    authenticated: {
      fr: ["Codex CLI · ChatGPT authentifié", "Codex CLI est authentifié avec ChatGPT. Aucun échange IA encore vérifié dans cette session."],
      en: ["Codex CLI · ChatGPT authenticated", "Codex CLI is signed in with ChatGPT. No AI exchange has been verified in this session yet."]
    },
    verified: {
      fr: ["Codex CLI · ChatGPT · échange réussi", "Un échange avec le modèle via Codex CLI a réussi dans cette session."],
      en: ["Codex CLI · ChatGPT · exchange succeeded", "An exchange with the model via Codex CLI succeeded in this session."]
    },
    unavailable: {
      fr: ["Codex CLI · non connecté", "Codex CLI absent, non authentifié ou statut indisponible. Consulter le panneau Codex."],
      en: ["Codex CLI · not connected", "Codex CLI missing, not authenticated or status unavailable. See the Codex panel."]
    },
    failed: {
      fr: ["Codex CLI · échec de l'échange", "Le dernier échange Codex CLI a échoué. Consulter le panneau Codex."],
      en: ["Codex CLI · exchange failed", "The last Codex CLI exchange failed. See the Codex panel."]
    }
  };
  let connectionKind = "checking";
  function connectionIndicator(kind) {
    connectionKind = kind;
    const indicator = $("ai-connection"), label = $("ai-connection-label");
    if (!indicator || !label) return;
    indicator.dataset.status = kind === "authenticated" || kind === "verified" ? "ready"
      : kind === "checking" ? "checking" : "unavailable";
    const language = window.UII18n?.language === "en" ? "en" : "fr";
    const [text, tooltip] = connectionLabels[kind][language];
    label.textContent = text;
    indicator.title = tooltip;
  }
  document.addEventListener("tria-language-changed", () => connectionIndicator(connectionKind));

  function state(text, error = false) {
    $("codex-status-text").textContent = text ?? (
      methodAcknowledged ? `Instructions trIA confirmées · ${activeInstructionVersion}`
        : methodAcknowledged === false ? "Start a new discussion to retry instruction transmission." : "Ready"
    );
    $("codex-status").dataset.error = String(error);
  }
  function show(role, phase, text) {
    const article = document.createElement("article");
    article.className = "codex-message";
    const title = document.createElement("strong");
    title.textContent = (role === "user" ? "Analyste" : "Codex via ChatGPT") + (phase ? " · " + phase : "");
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    article.append(title, paragraph);
    const history = $("codex-history");
    history.append(article);
    history.scrollTop = history.scrollHeight;
  }
  function reset() {
    messages.length = 0;
    TriaGraph.clearProposalPreview();
    $("codex-history").replaceChildren();
    $("codex-proposals").hidden = true;
    $("codex-map-data").textContent = "En attente d’une réponse.";
    $("codex-instruction-report").hidden = true;
    $("codex-test-result").hidden = true;
    $("codex-test-verdict").textContent = "No test run yet.";
    delete $("codex-test-verdict").dataset.outcome;
    if (!pending) state();
  }
  function getContext() {
    const { analysisRevision, focusId, inspectedObjectId, subjectId, scenarioId } = TriaGraph.getContext();
    const targetId = focusId || inspectedObjectId || subjectId || null;
    if (sourceRevision !== analysisRevision) {
      const previousRevision = sourceRevision;
      sourceRevision = analysisRevision;
      if (previousRevision !== null) reset();
    }
    $("codex-context").textContent = analysisRevision
      ? "Focus : " + targetId + (scenarioId ? " · Scénario : " + scenarioId : "")
      : "Discussion sans analyse chargée";
    return { analysisRevision, focusId: targetId, scenarioId };
  }
  async function connection() {
    connectionIndicator("checking");
    try {
      const result = await fetch("/api/codex/status", { cache: "no-store" });
      if (!result.ok) throw Error("Connexion locale indisponible");
      const data = await result.json();
      connectionIndicator(data.ready ? "authenticated" : "unavailable");
      if (!pending) state(data.ready ? undefined : data.message, !data.ready);
    } catch {
      connectionIndicator("unavailable");
      if (!pending) state("The trIA server could not connect to Codex.", true);
    }
  }
  $("codex-question").addEventListener("keydown", event => {
    if (event.key !== "Enter" || event.shiftKey || event.isComposing) return;
    event.preventDefault();
    if (!$("codex-send").disabled && !event.repeat) $("codex-form").requestSubmit($("codex-send"));
  });
  $("codex-clear-preview").addEventListener("click", () => TriaGraph.clearProposalPreview());
  document.addEventListener("tria-proposal-preview-changed", event => {
    $("codex-proposals").hidden = !event.detail;
    if (event.detail) {
      $("codex-proposals-count").textContent =
        `Aperçu provisoire · ${event.detail.objects} Objet(s), ${event.detail.relations} relation(s)`;
    }
  });
  function displayPreview(envelope) {
    if (!envelope) return false;
    const response = envelope.schema === "tria-codex-discovery-v1" ? {
      schema: "tria-map-response-v2", analysis_id: "discovery-preview", answer: envelope.answer,
      tria_instruction_check: envelope.tria_instruction_check, map_patch: envelope.map_patch
    } : envelope;
    if (!TriaGraph.previewProposals(response)) return false;
    window.TriaInstructionMap?.showAnalysis();
    return true;
  }
  function setPending(value) {
    pending = value;
    $("codex-send").disabled = value || methodAcknowledged === false;
    for (const id of ["codex-reset", "codex-test-library",
      "codex-test-three-objects", "codex-test-instruction-memory", "codex-ask-instructions"]) {
      $(id).disabled = value;
    }
    instructionSelection.disabled = value || !instructionSelection.options.length;
    $("codex-reset").disabled = value || !instructionSelection.value;
    $("codex-method-case").disabled = value || methodCases.length === 0;
    $("codex-run-method-case").disabled = value || !$("codex-method-case").value;
    $("codex-run-all-tests").disabled = value || methodCases.length === 0;
    $("codex-instruction-hierarchy").disabled = value || methodCases.length === 0;
  }
  async function requestTurn(body, path = "/api/codex/turn") {
    const response = await fetch(path, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (!response.ok) {
      if (response.status >= 500) connectionIndicator("failed");
      throw Error(data.error || "Codex request failed.");
    }
    return data;
  }
  $("codex-reset").addEventListener("click", async () => {
    const version = instructionSelection.value;
    if (pending || !version) return;
    reset();
    $("codex-question").value = "";
    methodAcknowledged = false;
    activeInstructionVersion = null;
    setPending(true);
    state(`Transmission des instructions trIA · ${version}`);
    try {
      const data = await requestTurn({ instruction_version: version }, "/api/codex/instructions");
      if (data.acknowledged !== true || data.instruction_version !== version)
        throw Error("Codex n’a pas confirmé la version d’instructions sélectionnée.");
      activeInstructionVersion = version;
      methodAcknowledged = true;
      connectionIndicator("verified");
      state();
    } catch (error) {
      state(String(error.message || error), true);
    } finally {
      setPending(false);
    }
  });
  $("codex-ask-instructions").addEventListener("click", async () => {
    if (pending) return;
    const { analysisRevision } = getContext();
    const output = $("codex-instruction-report");
    output.textContent = "Asking which instructions are known…";
    output.hidden = false;
    output.scrollIntoView({ block: "nearest" });
    setPending(true);
    state("Waiting for response…");
    try {
      const data = await requestTurn({
        document: null, focus_id: null, scenario_id: null,
        phase: $("phase").value, history: messages.slice(-12),
        ...(activeInstructionVersion && { instruction_version: activeInstructionVersion }),
        question: "Which explicitly supplied Trialectic Method instructions can you identify in this conversation? " +
          "Briefly report those instructions and which you applied. Exclude the exchange format and execution rules. " +
          "If you recognize none, say so. Leave the map data empty."
      });
      if (TriaGraph.getContext().analysisRevision !== analysisRevision) return;
      const report = data.envelope?.tria_instruction_check?.message;
      const summary = typeof report === "string" ? report.trim() : "";
      const source = methodAcknowledged
        ? `Instructions trIA transmises · ${activeInstructionVersion}.`
        : data.project_instructions_enabled
          ? "Codex project guidance is enabled. trIA sent the exchange contract."
          : "trIA sent the exchange contract.";
      output.textContent = source + " Reported instructions · " + (summary || data.answer);
      connectionIndicator("verified");
    } catch (error) {
      if (TriaGraph.getContext().analysisRevision !== analysisRevision) return;
      output.textContent = "Instruction query interrupted · " + String(error.message || error);
    } finally {
      setPending(false);
      state();
      if (!output.hidden) output.scrollIntoView({ block: "nearest" });
    }
  });
  async function evaluateCase(test, { followUp = false, allInstructions = false, instructionPrefix = false } = {}) {
    const twoTurns = !instructionPrefix && (followUp || test.follow_up?.preserve_object_ids === true);
    const data = test.instruction_id
      ? await requestTurn({
        case_id: test.id, follow_up: twoTurns, all_instructions: allInstructions,
        instruction_prefix: instructionPrefix
      }, "/api/codex/test")
      : await requestTurn(test.request);
    const turns = twoTurns ? data.turns : [data];
    const report = twoTurns ? window.TriaMethodTests.evaluateFollowUp(test, turns)
      : window.TriaMethodTests.evaluate(test, data, instructionPrefix ? test.starting_map : null);
    return { turns, report, twoTurns };
  }
  function showTestExchange(test, { turns, twoTurns }, instructionPrefix) {
    const label = "Test · " + (twoTurns ? test.follow_up.name : test.name);
    turns.forEach((turn, index) => {
      const followUp = index > 0 || (instructionPrefix && test.starting_map);
      show("user", label, followUp ? test.follow_up.message : test.message ?? test.request.question);
      show("assistant", label, turn.answer);
    });
  }
  async function runTest(loadCase, options = {}) {
    if (pending) return;
    const result = $("codex-test-result");
    const verdict = $("codex-test-verdict");
    result.hidden = true;
    delete verdict.dataset.outcome;
    verdict.textContent = "Test running…";
    verdict.scrollIntoView({ block: "nearest" });
    setPending(true);
    let test;
    try {
      test = await loadCase();
      const evaluation = await evaluateCase(test, options);
      const { turns, report, twoTurns } = evaluation;
      showTestExchange(test, evaluation, options.instructionPrefix);
      const passed = report.checks.filter(check => check.passed).length;
      verdict.textContent = `${report.conclusion} · ${passed}/${report.checks.length} checks passed · ${report.coverage}`;
      verdict.dataset.outcome = report.conclusion === "Pass" ? "pass" : "fail";
      const patches = turns.map(turn => turn.envelope?.map_patch ?? null);
      result.textContent = JSON.stringify({
        ...report, instruction_ids: turns[0].instruction_ids, map_patch: twoTurns ? patches : patches[0]
      }, null, 2);
      result.hidden = false;
      window.TriaInstructionMap?.record(test.instruction_id, report.conclusion);
      connectionIndicator("verified");
    } catch (error) {
      verdict.textContent = "Test interrupted · " + String(error.message || error);
      verdict.dataset.outcome = "fail";
      if (test) window.TriaInstructionMap?.record(test.instruction_id, "Error");
    } finally {
      setPending(false);
      verdict.scrollIntoView({ block: "nearest" });
    }
  }
  $("codex-test-library").addEventListener("click", () => runTest(() => window.TriaMethodTests.library));
  let methodCases = [];
  async function loadMethodCatalog() {
    const response = await fetch("/workspace/trIA-prompts.json", { cache: "no-store" });
    const { cases, reasoning_tests, instruction_order, error } = await response.json();
    if (!response.ok) throw Error(error || `Could not load the test catalog (HTTP ${response.status}).`);
    if (![cases, reasoning_tests, instruction_order].every(Array.isArray)) throw Error("Incomplete instruction catalog.");
    return { cases, reasoningTests: reasoning_tests, order: instruction_order };
  }
  const catalog = loadMethodCatalog().then(({ cases, reasoningTests, order }) => {
    methodCases = cases;
    const positions = new Map(order.map((id, index) => [id, index + 1]));
    const automatic = new Map();
    for (const test of cases) {
      if (!automatic.has(test.instruction_id)) automatic.set(test.instruction_id, test);
    }
    const deferred = new Map(reasoningTests.map(test => [test.instruction_id, { ...test, deferred: true }]));
    const hierarchy = order.map(id => automatic.get(id) ?? deferred.get(id));
    window.TriaInstructionMap?.setCases(hierarchy);
    $("codex-method-case").replaceChildren(new Option("Select a test…", ""),
      ...cases.map(test => new Option(test.name, test.id)));
    $("codex-method-case").disabled = pending || !cases.length;
    $("codex-run-all-tests").disabled = pending || !cases.length;
    $("codex-instruction-hierarchy").disabled = pending || !cases.length;
    $("codex-instruction-list").replaceChildren(...hierarchy.map(test => {
      const item = document.createElement("li");
      item.value = positions.get(test.instruction_id);
      if (test.deferred) {
        const label = document.createElement("span");
        label.className = "muted";
        label.textContent = test.name + " · Deferred";
        item.append(label);
        return item;
      }
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = test.name;
      button.addEventListener("click", () => runTestSequence(
        cases.slice(0, cases.indexOf(test) + 1), { instructionPrefix: true }
      ));
      item.append(button);
      return item;
    }));
    $("codex-reasoning-summary").textContent = `Reasoning tests (${reasoningTests.length}) · Deferred`;
    $("codex-reasoning-list").replaceChildren(...reasoningTests.map(test => {
      const item = document.createElement("li");
      item.value = positions.get(test.instruction_id);
      const title = document.createElement("strong");
      title.textContent = test.name;
      const reason = document.createElement("p");
      reason.className = "muted";
      reason.textContent = test.reasoning_question;
      item.append(title, reason);
      return item;
    }));
    $("codex-reasoning-tests").hidden = reasoningTests.length === 0;
    return cases;
  }).catch(error => {
    methodCases = [];
    $("codex-method-case").replaceChildren(new Option("Test catalog unavailable", ""));
    const diagnostic = document.createElement("li");
    diagnostic.textContent = String(error.message || error);
    $("codex-instruction-list").replaceChildren(diagnostic);
    $("codex-reasoning-tests").hidden = true;
    setPending(pending);
    return [];
  });
  async function loadMethodCase(id) {
    const test = (await catalog).find(item => item.id === id);
    if (!test) throw Error("Test missing from the catalog.");
    return test;
  }
  const loadThreeObjects = () => loadMethodCase("three-library-objects");
  $("codex-method-case").addEventListener("change", event => {
    $("codex-run-method-case").disabled = pending || !event.target.value;
  });
  $("codex-run-method-case").addEventListener("click", () => {
    const id = $("codex-method-case").value;
    if (id) runTest(() => loadMethodCase(id));
  });
  async function runTestSequence(tests, options) {
    if (pending || tests.length === 0) return;
    const verdict = $("codex-test-verdict");
    const result = $("codex-test-result");
    const total = tests.length;
    const selected = options.instructionPrefix ? tests[total - 1] : null;
    const scope = selected ? "Through " + selected.name : "All Method instructions";
    let passed = 0, completed = 0;
    const notPassed = [];
    const formatOnly = [];
    let selectedReport, stoppedAt;
    setPending(true);
    delete verdict.dataset.outcome;
    result.hidden = false;
    result.textContent = scope + " · No completed tests yet.";
    verdict.textContent = `0/${total} complete · Starting tests…`;
    verdict.scrollIntoView({ block: "nearest" });
    try {
      window.TriaInstructionMap?.startRun(tests.map(test => test.instruction_id));
      for (const test of tests) {
        verdict.textContent = `${completed}/${total} complete · ${passed} passed · Running: ${test.name}`;
        let outcome;
        try {
          const evaluation = await evaluateCase(test, options);
          const { turns, report } = evaluation;
          outcome = report.conclusion;
          if (report.coverage === "Exchange format only") formatOnly.push(test.name);
          window.TriaInstructionMap?.record(test.instruction_id, outcome, false);
          if (outcome === "Pass") {
            passed++;
          } else {
            notPassed.push({
              test: test.name,
              outcome, coverage: report.coverage, checks: report.checks.filter(check => !check.passed)
            });
          }
          if (test === selected) {
            showTestExchange(test, evaluation, true);
            selectedReport = {
              ...report, instruction_ids: turns[0].instruction_ids,
              map_patch: turns[0].envelope?.map_patch ?? null
            };
          }
          connectionIndicator("verified");
        } catch (error) {
          outcome = "Error";
          notPassed.push({ test: test.name, outcome: "Error", message: String(error.message || error) });
          window.TriaInstructionMap?.record(test.instruction_id, "Error", false);
        }
        completed++;
        if (outcome === "Fail" || outcome === "Error") {
          stoppedAt = { test: test.name, outcome };
        }
        result.textContent = JSON.stringify({
          scope, completed, total, passed, not_passed: notPassed, selected_test: selectedReport,
          exchange_format_only: formatOnly,
          stopped_at: stoppedAt, not_run: stoppedAt ? tests.slice(completed).map(test => test.name) : undefined
        }, null, 2);
        result.hidden = false;
        if (stoppedAt) break;
      }
    } finally {
      verdict.textContent = stoppedAt
        ? `Stopped at ${stoppedAt.test} (${stoppedAt.outcome}) · ${passed} passed · ${total - completed} not run`
        : `${passed}/${total} tests passed · ${notPassed.length} did not pass`;
      verdict.dataset.outcome = notPassed.length ? "fail" : "pass";
      setPending(false);
      verdict.scrollIntoView({ block: "nearest" });
    }
  }
  $("codex-run-all-tests").addEventListener("click", () => runTestSequence(methodCases, { allInstructions: true }));
  $("codex-test-three-objects").addEventListener("click", () => runTest(loadThreeObjects));
  $("codex-test-instruction-memory").addEventListener("click", () => runTest(loadThreeObjects, { followUp: true }));
  $("codex-form").addEventListener("submit", async event => {
    event.preventDefault();
    if ($("codex-send").disabled) return;
    const context = getContext();
    const question = $("codex-question").value.trim();
    if (!question) return;
    const phase = $("phase").value, originalDoc = TriaGraph.getAnalysis();
    setPending(true);
    state("Waiting for response…");
    try {
      const data = await requestTurn({
        document: originalDoc, phase, focus_id: context.focusId,
        scenario_id: context.scenarioId, question, history: messages.slice(-12),
        ...(activeInstructionVersion && { instruction_version: activeInstructionVersion })
      });
      if (TriaGraph.getContext().analysisRevision !== context.analysisRevision)
        throw Error("L'Analysis a changé pendant le tour : résultat écarté.");
      show("user", null, question);
      show("assistant", null, data.answer);
      const report = data.envelope?.tria_instruction_check?.message;
      const instructionReport = typeof report === "string" ? report.slice(0, 1200) : "";
      messages.push({ role: "user", text: question.slice(0, 4500) },
        { role: "assistant", text: data.answer.slice(0, 4500), instruction_report: instructionReport });
      if (messages.length > 12) messages.splice(0, messages.length - 12);
      $("codex-question").value = "";
      const patch = data.envelope?.map_patch;
      $("codex-instruction-report").textContent = instructionReport || "No instruction reported.";
      $("codex-instruction-report").hidden = false;
      $("codex-map-data").textContent = patch
        ? JSON.stringify(patch, null, 2)
        : "Aucune donnée de carte dans cette réponse.";
      connectionIndicator("verified");
      state();
      try {
        if (!displayPreview(data.envelope)) state("Réponse reçue · aucune nouvelle proposition de carte.");
      } catch (error) {
        state("Aperçu de la carte indisponible · " + String(error.message || error), true);
      }
    } catch (error) {
      if (error instanceof TypeError) connectionIndicator("failed");
      state(String(error.message || error), true);
    } finally {
      setPending(false);
      getContext();
    }
  });
  for (const id of ["scenario", "entity", "dataset"]) {
    $(id).addEventListener("change", () => { if (!pending) getContext(); });
  }
  document.addEventListener("tria-analysis-loaded", getContext);
  getContext();
  connection();
  window.addEventListener("focus", () => {
    if (!pending && connectionKind === "unavailable") connection();
  });
})();
