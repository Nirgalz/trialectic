/* Development workspace adapter for the local Codex CLI (no API key).
   This page does not connect to, or mirror, the current chatgpt.com thread. */
(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const messages = [];
  let sourceRevision = null, pending = false, candidate = null;

  function state(text, error = false) {
    $("codex-status").textContent = text;
    $("codex-status").dataset.error = String(error);
  }
  function show(role, phase, text) {
    const article = document.createElement("article");
    article.className = "codex-message";
    const title = document.createElement("strong");
    title.textContent = (role === "user" ? "Analyste" : "Codex via ChatGPT") + " · " + phase;
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    article.append(title, paragraph);
    $("codex-history").append(article);
    article.scrollIntoView({ block: "nearest" });
  }
  function reset() {
    messages.length = 0;
    candidate = null;
    $("codex-history").replaceChildren();
    $("codex-proposals").hidden = true;
    state("Conversation locale réinitialisée ; aucune Analysis modifiée.");
  }
  function getContext() {
    const { analysisRevision, focusId, inspectedObjectId, subjectId, scenarioId } = TriaGraph.getContext();
    if (!analysisRevision) return null;
    const targetId = focusId || inspectedObjectId || subjectId;
    if (sourceRevision !== analysisRevision) {
      const previousRevision = sourceRevision;
      sourceRevision = analysisRevision;
      if (previousRevision !== null) reset();
    }
    $("codex-context").textContent = "Focus : " + targetId +
      (scenarioId ? " · Scénario : " + scenarioId : "");
    return { analysisRevision, focusId: targetId, scenarioId };
  }
  async function connection() {
    try {
      const result = await fetch("/api/codex/status", { cache: "no-store" });
      if (!result.ok) throw Error("Connexion locale indisponible");
      const data = await result.json();
      state(data.message, !data.ready);
    } catch {
      state("Serveur trIA non connecté à Codex. Démarre le serveur local.", true);
    }
  }
  $("codex-phase").value = $("phase").value;
  $("codex-phase").addEventListener("change", () => {
    if (pending) return;
    $("phase").value = $("codex-phase").value;
    $("phase").dispatchEvent(new Event("change"));
  });
  $("phase").addEventListener("change", () => {
    $("codex-phase").value = $("phase").value;
  });
  $("codex-reset").addEventListener("click", reset);
  $("codex-stage").addEventListener("click", () => {
    if (!getContext() || !candidate) return;
    try {
      TriaGraph.stageProposals(candidate);
      candidate = null;
      $("codex-proposals").hidden = true;
      state("Propositions ajoutées provisoirement à la carte de référence. Analysis intacte.");
    } catch (error) {
      state("Propositions refusées : " + String(error.message || error), true);
    }
  });
  $("codex-form").addEventListener("submit", async event => {
    event.preventDefault();
    if (pending) return;
    const context = getContext();
    if (!context) { state("Charge une Analysis avant de solliciter Codex.", true); return; }
    const question = $("codex-question").value.trim();
    if (!question) return;
    const phase = $("codex-phase").value, originalDoc = TriaGraph.getAnalysis();
    pending = true;
    ["codex-send", "codex-reset", "codex-phase"].forEach(id => $(id).disabled = true);
    $("codex-proposals").hidden = true;
    candidate = null;
    state("Codex traite le tour trIA local…");
    try {
      const response = await fetch("/api/codex/turn", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          document: originalDoc, phase, focus_id: context.focusId,
          scenario_id: context.scenarioId, question, history: messages.slice(-12)
        })
      });
      const data = await response.json();
      if (!response.ok) throw Error(data.error || "Échec du pont Codex.");
      if (TriaGraph.getContext().analysisRevision !== context.analysisRevision)
        throw Error("L'Analysis a changé pendant le tour : résultat écarté.");
      show("user", phase, question);
      show("assistant", phase, data.answer);
      messages.push({ role: "user", text: question.slice(0, 4500) },
        { role: "assistant", text: data.answer.slice(0, 4500) });
      if (messages.length > 12) messages.splice(0, messages.length - 12);
      $("codex-question").value = "";
      const patch = data.envelope?.map_patch;
      if (data.structured && patch && (patch.objects?.length || patch.relations?.length)) {
        candidate = data.envelope;
        $("codex-proposals-count").textContent =
          patch.objects.length + " Objet(s) et " + patch.relations.length +
          " relation(s) proposés ; ni confirmés ni intégrés.";
        $("codex-proposals").hidden = false;
      }
      state(data.structured
        ? "Réponse Codex structurée reçue. Les décisions restent à l'Analyste."
        : "Réponse libre reçue. Pas de propositions structurées à importer.");
    } catch (error) {
      state(String(error.message || error), true);
    } finally {
      pending = false;
      ["codex-send", "codex-reset", "codex-phase"].forEach(id => $(id).disabled = false);
      getContext();
    }
  });
  for (const id of ["scenario", "entity", "dataset"]) {
    $(id).addEventListener("change", () => { if (!pending) getContext(); });
  }
  document.addEventListener("tria-analysis-loaded", getContext);
  getContext();
  connection();
})();
