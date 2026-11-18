/* A temporary methodological view using the reference map's Cytoscape runtime. */
(() => {
  const byId = id => document.getElementById(id);
  const viewButtons = byId("codex-map-views");
  const analysisView = viewButtons.parentElement.querySelector(".workspace");
  const instructionView = byId("codex-instruction-map");
  const container = byId("codex-instruction-graph");
  const analysisButton = byId("codex-show-analysis-map");
  const instructionButton = byId("codex-show-instruction-map");
  const outcomes = new Map();
  let cases = [], graph = null, lastWidth = 0;

  function label(test, index) {
    const status = outcomes.get(test.instruction_id) ?? (test.deferred ? "Reasoning test · Deferred" : "Not tested");
    return `${index + 1}. ${test.name}\n${status}`;
  }

  function updateNodes() {
    container.setAttribute("aria-label", cases.map(label).join("; "));
    if (!graph) return;
    graph.batch(() => cases.forEach((test, index) => {
      const node = graph.getElementById(test.instruction_id);
      const outcome = outcomes.get(test.instruction_id);
      node.data("label", label(test, index));
      node.toggleClass("passed", outcome === "Pass");
      node.toggleClass("not-passed", Boolean(outcome) && outcome !== "Pass");
    }));
  }

  function styles() {
    const theme = getComputedStyle(document.documentElement);
    const color = name => theme.getPropertyValue(name).trim();
    return [
      { selector: "node", style: {
        shape: "round-rectangle", width: 204, height: 58,
        label: "data(label)", "text-wrap": "wrap", "text-max-width": 184,
        "font-size": 12, "text-valign": "center", "text-halign": "center",
        color: color("--ink"), "background-color": color("--raised"),
        "border-width": 1, "border-color": color("--muted")
      } },
      { selector: "node.passed", style: {
        color: color("--bg"), "background-color": color("--positive"), "border-width": 0
      } },
      { selector: "node.not-passed", style: {
        color: color("--bg"), "background-color": color("--negative"), "border-width": 0
      } },
      { selector: "edge", style: {
        width: 1.5, "curve-style": "straight", "target-arrow-shape": "triangle",
        "line-color": color("--muted"), "target-arrow-color": color("--muted")
      } }
    ];
  }

  function layout() {
    if (!graph || !container.clientWidth || container.clientWidth === lastWidth) return;
    lastWidth = container.clientWidth;
    const columns = Math.min(4, Math.max(1, Math.floor(lastWidth / 240)));
    container.style.height = Math.max(230, Math.ceil(cases.length / columns) * 84 + 16) + "px";
    graph.batch(() => cases.forEach((test, index) => {
      const row = Math.floor(index / columns);
      const slot = index % columns;
      const column = row % 2 ? columns - slot - 1 : slot;
      graph.getElementById(test.instruction_id).position({ x: column * 232, y: row * 84 });
    }));
    graph.resize();
    graph.fit(graph.elements(), 14);
  }

  function show(useInstructions) {
    analysisButton.setAttribute("aria-pressed", String(!useInstructions));
    instructionButton.setAttribute("aria-pressed", String(useInstructions));
    analysisView.hidden = useInstructions;
    instructionView.hidden = !useInstructions;
    if (!useInstructions) {
      graph?.destroy();
      graph = null;
      lastWidth = 0;
      return;
    }
    if (graph) return;
    const elements = cases.flatMap((test, index) => {
      const id = test.instruction_id;
      const node = { data: { id, label: label(test, index) } };
      return index === 0 ? [node] : [node, {
        data: { id: "precedes:" + id, source: cases[index - 1].instruction_id, target: id }
      }];
    });
    graph = window.cytoscape({
      container, elements, style: styles(), layout: { name: "preset", fit: false },
      minZoom: 0.2, maxZoom: 1.1, autoungrabify: true, autounselectify: true,
      userPanningEnabled: false, userZoomingEnabled: false
    });
    updateNodes();
    layout();
  }

  analysisButton.addEventListener("click", () => show(false));
  instructionButton.addEventListener("click", () => show(true));
  new ResizeObserver(layout).observe(container);
  new MutationObserver(() => { if (graph) graph.style(styles()); }).observe(document.documentElement, {
    attributes: true, attributeFilter: ["data-theme"]
  });

  window.TriaInstructionMap = {
    showAnalysis() { show(false); },
    setCases(next) { cases = next; },
    startRun(instructionIds) {
      instructionIds.forEach(id => outcomes.delete(id));
      if (!cases.length || !window.cytoscape) return;
      viewButtons.hidden = false;
      show(true);
      updateNodes();
    },
    record(instructionId, outcome, reveal = true) {
      if (!cases.some(test => test.instruction_id === instructionId) || !window.cytoscape) return;
      outcomes.set(instructionId, outcome);
      viewButtons.hidden = false;
      if (reveal) show(true);
      updateNodes();
    }
  };
})();
