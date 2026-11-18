/* Development workspace adapter for the local Codex CLI (no API key).
   This page does not connect to, or mirror, the current chatgpt.com thread. */
(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const messages = [];
  let sourceRevision = null, pending = false, candidate = null;
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
    connectionIndicator("checking");
    try {
      const result = await fetch("/api/codex/status", { cache: "no-store" });
      if (!result.ok) throw Error("Connexion locale indisponible");
      const data = await result.json();
      connectionIndicator(data.ready ? "authenticated" : "unavailable");
      state(data.message, !data.ready);
    } catch {
      connectionIndicator("unavailable");
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
      if (!response.ok) {
        if (response.status >= 500) connectionIndicator("failed");
        throw Error(data.error || "Échec du pont Codex.");
      }
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
      connectionIndicator("verified");
      state(data.structured
        ? "Réponse Codex structurée reçue. Les décisions restent à l'Analyste."
        : "Réponse libre reçue. Pas de propositions structurées à importer.");
    } catch (error) {
      if (error instanceof TypeError) connectionIndicator("failed");
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
  window.addEventListener("focus", () => { if (!pending) connection(); });
})();
