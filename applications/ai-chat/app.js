/* Browser-only trIA multi-provider chat adapter; no graphical renderer. */
(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const PROVIDERS = Object.freeze({
    gemini: {
      label: "Gemini", model: "gemini-2.5-flash",
      suggestions: ["gemini-2.5-flash", "gemini-2.5-flash-lite"],
      hint: "Clé Google AI Studio. Offre gratuite soumise à quotas."
    },
    openai: {
      label: "OpenAI", model: "gpt-5.4-mini",
      suggestions: ["gpt-5.4-mini", "gpt-5.4-nano"],
      hint: "Clé API OpenAI, facturée séparément de ChatGPT Plus. N'accède pas à cette conversation ChatGPT."
    },
    anthropic: {
      label: "Claude", model: "claude-sonnet-4-6",
      suggestions: ["claude-sonnet-4-6", "claude-haiku-4-5-20251001"],
      hint: "Clé Anthropic Console. Le mode navigateur direct requiert un en-tête de sécurité spécifique et comporte des risques."
    }
  });
  const LIMIT_TURNS = 16;
  const conversations = new Map(Object.keys(PROVIDERS).map(key => [key, []]));
  const sessions = new Map(Object.keys(PROVIDERS).map(key => [key, {
    initialized: false, attempted: false, model: "", apiKey: ""
  }]));
  const rememberedKeys = new Map(); // Mémoire volatile, jamais localStorage ni sessionStorage.
  const rememberedModels = new Map(Object.entries(PROVIDERS).map(pair => [pair[0], pair[1].model]));
  let provider = "gemini";
  let controller = null;
  let pending = false;
  let doc = null;
  let docLabel = "";
  let selected = null;
  let methodInstructions = "";
  let methodLoadError = "";
  let graphRevision = 0;
  let pendingProposal = null;
  let acceptedOverlay = { objects: [], relations: [] };

  function status(message, error = false) {
    $("status").textContent = message;
    $("status").classList.toggle("error", error);
  }
  function graphStatus(message) {
    $("graph-status").textContent = message;
  }
  function refreshSessionStatus() {
    const session = sessions.get(provider);
    const state = session.initialized
      ? "trIA initialisée · respect autodéclaré, non vérifié"
      : session.attempted
        ? "initialisation échouée · nouvelle discussion requise"
        : "trIA à initialiser au premier envoi";
    $("conversation-hint").textContent = "Conversation " + PROVIDERS[provider].label + " · " + state;
  }
  function selectProvider(value) {
    if (pending || !PROVIDERS[value] || provider === value) return;
    rememberedKeys.set(provider, $("api-key").value);
    rememberedModels.set(provider, $("model").value);
    provider = value;
    $("api-key").value = rememberedKeys.get(value) || "";
    $("api-key").type = "password";
    $("show-key").textContent = "Voir";
    $("show-key").setAttribute("aria-label", "Afficher la clé");
    $("model").value = rememberedModels.get(value);
    $("model-list").replaceChildren();
    PROVIDERS[value].suggestions.forEach(name => {
      const option = document.createElement("option");
      option.value = name;
      $("model-list").append(option);
    });
    $("model-hint").textContent = PROVIDERS[value].hint;
    refreshSessionStatus();
    renderConversation();
    status("Fournisseur actif : " + PROVIDERS[value].label + ". Les conversations restent séparées.");
  }
  function setPending(value) {
    pending = value;
    ["provider", "model", "api-key", "chat-reset", "chat-export", "show-key", "graph-reset", "graph-import", "overlay-clear"].forEach(id => $(id).disabled = value);
    $("send-message").disabled = value;
    $("cancel-request").hidden = !value;
  }
  function messageNode(message) {
    const article = document.createElement("article");
    article.className = "message " + (message.role === "user" ? "is-user" : "is-model");
    const who = document.createElement("div");
    who.className = "who";
    who.textContent = message.role === "user" ? "Vous" : PROVIDERS[provider].label;
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = message.visible || message.text; // Jamais de HTML fourni par l'IA.
    article.append(who, bubble);
    if (message.checkMessage) {
      const check = document.createElement("div");
      check.className = "message-meta";
      check.textContent = message.checkMessage;
      article.append(check);
    }
    if (message.contextLabel) {
      const context = document.createElement("div");
      context.className = "message-meta";
      context.textContent = "Contexte de la carte joint : " + message.contextLabel;
      article.append(context);
    }
    $("messages").append(article);
    return article;
  }
  function renderConversation() {
    $("messages").replaceChildren();
    const entries = conversations.get(provider);
    if (!entries.length) {
      const empty = document.createElement("div");
      empty.className = "empty-chat";
      empty.id = "empty-chat";
      const icon = document.createElement("div");
      icon.className = "empty-icon";
      icon.textContent = "⌁";
      const title = document.createElement("strong");
      title.textContent = "Une nouvelle discussion avec " + PROVIDERS[provider].label;
      const body = document.createElement("p");
      body.textContent = "Envoie un message. Sélectionne un nœud de la carte et coche l'option de contexte si tu souhaites aussi interroger l'IA à son sujet.";
      empty.append(icon, title, body);
      $("messages").append(empty);
    } else {
      entries.forEach(messageNode);
    }
    $("messages").scrollTop = $("messages").scrollHeight;
  }
  function apiHistory() {
    const entries = conversations.get(provider).slice(-LIMIT_TURNS);
    return entries.map(entry => ({ role: entry.role, text: entry.text }));
  }
  function errorText(httpStatus, data) {
    const message = String(data?.error?.message || data?.message || "").slice(0, 380);
    if (httpStatus === 401 || httpStatus === 403) return "Accès refusé (" + httpStatus + "). Vérifie la clé, les autorisations et les restrictions du projet. " + message;
    if (httpStatus === 404) return "Modèle non trouvé (404). Vérifie son nom ou l'accès de ton compte. " + message;
    if (httpStatus === 429) return "Quota, crédits ou fréquence de requêtes dépassés (429). " + message;
    return "Erreur HTTP " + httpStatus + ". " + message;
  }
  async function apiCall(url, headers, body, signal) {
    const response = await fetch(url, {
      method: "POST", mode: "cors", headers,
      body: JSON.stringify(body), cache: "no-store", signal, credentials: "omit"
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(errorText(response.status, data));
    return data;
  }
  async function sendToGemini(apiKey, model, turns, signal, method) {
    const { data, text } = await TriaGeminiClient.request({
      apiKey, model, signal, fetchImpl: fetch, onHttpError: errorText,
      systemInstruction: method, responseMimeType: "application/json",
      contents: turns.map(turn => ({
        role: turn.role === "assistant" ? "model" : "user",
        parts: [{ text: turn.text }]
      }))
    });
    if (!text) throw new Error("Aucun texte Gemini. Motif : " + (data.candidates?.[0]?.finishReason || data.promptFeedback?.blockReason || "indéterminé"));
    return text;
  }
  async function sendToOpenAI(apiKey, model, turns, signal, method) {
    const data = await apiCall(
      "https://api.openai.com/v1/responses",
      { "Authorization": "Bearer " + apiKey, "Content-Type": "application/json" },
      { model, store: false,
        ...(method ? { instructions: method } : {}),
        input: turns.map(turn => ({ role: turn.role, content: turn.text }))
      },
      signal
    );
    const text = typeof data.output_text === "string" ? data.output_text :
      (data.output || []).flatMap(item => item.content || [])
        .filter(item => item.type === "output_text" && typeof item.text === "string")
        .map(item => item.text).join("\n");
    if (!text || !text.trim()) throw new Error("L'API OpenAI a répondu sans texte exploitable (statut : " + (data.status || "inconnu") + ").");
    return text.trim();
  }
  async function sendToClaude(apiKey, model, turns, signal, method) {
    const data = await apiCall(
      "https://api.anthropic.com/v1/messages",
      {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      {
        model, max_tokens: 4096,
        ...(method ? { system: method } : {}),
        messages: turns.map(turn => ({ role: turn.role, content: turn.text }))
      },
      signal
    );
    const text = (data.content || [])
      .filter(block => block.type === "text" && typeof block.text === "string")
      .map(block => block.text).join("\n").trim();
    if (!text) throw new Error("Claude n'a pas renvoyé de texte (arrêt : " + (data.stop_reason || "inconnu") + ").");
    return text;
  }

  async function loadMethodInstructions() {
    // The behavioral prompt and UI response contract have different owners.
    // Preserve the existing first-turn payload: send both together only once.
    try {
      const paths = [
        "../tria/ai/portable-instructions.md",
        "../../protocols/tria/map-response-contract.md"
      ];
      const responses = await Promise.all(paths.map(path => fetch(path, { cache: "no-store" })));
      for (let i = 0; i < responses.length; i++) {
        if (!responses[i].ok) throw new Error("HTTP " + responses[i].status + " : " + paths[i]);
      }
      const [behavior, transport] = await Promise.all(responses.map(response => response.text()));
      if (!behavior.includes("Trialectic Method") || !transport.includes("tria-map-response-v2") ||
          !transport.includes("map_patch") || !transport.includes("tria_instruction_check"))
        throw new Error("Les instructions trIA et leur contrat de réponse sont incompatibles.");
      methodInstructions = behavior + "\n\n" + transport;
      methodLoadError = "";
      $("method-state").textContent = "Instructions trIA chargées · " + methodInstructions.length + " caractères";
    } catch (error) {
      methodInstructions = "";
      methodLoadError = String(error.message || error);
      $("method-state").textContent = "Instructions trIA indisponibles";
      status("Impossible de charger les instructions trIA et leur contrat : " + methodLoadError, true);
    }
  }
  function resetProposals() {
    pendingProposal = null;
    acceptedOverlay = { objects: [], relations: [] };
    $("proposal-panel").hidden = true;
    $("proposal-detail").textContent = "";
  }
  function showPendingProposal() {
    const panel = $("proposal-panel");
    panel.hidden = !pendingProposal;
    if (!pendingProposal) return;
    const patch = pendingProposal.patch;
    $("proposal-count").textContent = patch.objects.length + " objets · " + patch.relations.length + " relations";
    const details = [
      "Fournisseur : " + pendingProposal.provider,
      "ANALYSE : " + pendingProposal.analysisId,
      "NOUVEAUX OBJETS :",
      ...patch.objects.map(o => "• " + o.id + " · " + o.label + "\n  " + o.justification),
      "NOUVELLES RELATIONS :",
      ...patch.relations.map(r => "• " + r.id + " [" + r.type + "] " + r.origin_object_id + " → " + r.represented_object_id + "\n  " + r.description + "\n  " + r.justification)
    ];
    $("proposal-detail").textContent = details.join("\n");
  }
  function acceptProposal() {
    if(!pendingProposal||!doc)return;
    if(pendingProposal.revision!==graphRevision||pendingProposal.analysisId!==doc.analysis_id){
      pendingProposal=null;showPendingProposal();status("Proposition incompatible avec l'Analysis.",true);return;
    }
    try {
      const envelope={
        schema:"tria-map-response-v2",analysis_id:doc.analysis_id,
        answer:"Propositions IA provisoires à examiner dans la carte de référence.",
        tria_instruction_check:pendingProposal.check,map_patch:pendingProposal.patch
      };
      TriaMapProtocol.validate(doc,envelope,acceptedOverlay);
      downloadJSON(envelope,"tria-map-proposals-"+doc.analysis_id+".json");
      // Tentative conversational context only; no normative writes.
      acceptedOverlay.objects.push(...pendingProposal.patch.objects);
      acceptedOverlay.relations.push(...pendingProposal.patch.relations);
      pendingProposal=null;showPendingProposal();
      status("Propositions exportées. Importe le JSON dans triad-graph.");
    }catch(error){status(String(error.message||error),true);}
  }
  function rejectProposal() {
    if (!pendingProposal) return;
    pendingProposal = null;
    showPendingProposal();
    status("Proposition cartographique rejetée ; aucune modification de la carte.");
  }
  function clearOverlay() {
    resetProposals();
    status("Contexte local des propositions effacé. L'Analysis source reste inchangée.");
  }
  function allObjects() {
    return doc.objects.concat(acceptedOverlay.objects.map(o => ({ ...o, proposed: true })));
  }
  function allRelations() {
    return doc.relations.concat(acceptedOverlay.relations.map(r => ({
      id: r.id, version: "candidate", type: r.type, proposed: true,
      origin_object: { id: r.origin_object_id },
      represented_object: { id: r.represented_object_id },
      CANs: r.can_object_ids.map(id => ({ id })),
      NEEDs: r.need_object_ids.map(id => ({ id })),
      description: r.description, justification: r.justification, relation: { links: [] }
    })));
  }

  function buildContext() {
    if (!$("include-graph").checked || !doc || !selected) return null;
    const objects = allObjects();
    const relations = allRelations();
    const main = objects.find(item => item.id === doc.main_subject?.id);
    const prefix = [
      "EXTRAIT DU GRAPHE trIA. Source : " + docLabel + ".",
      "Analyse : " + (doc.analysis_id || "non renseignée") + ".",
      "Sujet principal : " + (main?.label || doc.main_subject?.id || "non renseigné") + ".",
      "Ces enregistrements décrivent un modèle d'analyse ; ils ne constituent pas nécessairement des faits.",
      "Aucune Actualisation n'est déduite de la carte."
    ];
    if (selected.family === "object") {
      const item = objects.find(obj => obj.id === selected.id);
      if (!item) return null;
      prefix.push("Objet sélectionné : " + item.id + " — " + (item.label || "") + ". Catégorie : " + (item.category || "non renseignée") + "." + (item.proposed ? " PROPOSITION IA NON VALIDÉE : " + item.justification : ""));
      const definition = (doc.definitions || []).find(d => d.object_id === item.id);
      if (definition) prefix.push("Définition et propriétés enregistrées : " + JSON.stringify(definition).slice(0, 2400));
      const related = relations.filter(r => r.origin_object?.id === item.id ||
        r.represented_object?.id === item.id ||
        (r.CANs || []).some(ref => ref.id === item.id) ||
        (r.NEEDs || []).some(ref => ref.id === item.id));
      prefix.push("Relations associées (" + related.length + ") : " +
        JSON.stringify(related.slice(0, 12).map(r => ({
          id: r.id, type: r.type,
          origin: r.origin_object?.id, represented: r.represented_object?.id,
          description: r.description,
          liens: (r.relation?.links || []).map(l => ({ objet: l.object_id, roles: l.roles, causality: l.causality }))
        }))).slice(0, 3800));
    } else {
      const r = relations.find(item => item.id === selected.id);
      if (!r) return null;
      prefix.push("Relation sélectionnée : " + JSON.stringify(r).slice(0, 5700) + (r.proposed ? " PROPOSITION IA NON VALIDÉE." : ""));
    }
    return {
      label: selected.id,
      text: prefix.join("\n") + "\nFIN DE L'EXTRAIT DU GRAPHE."
    };
  }
  async function submit(event) {
    event.preventDefault();
    if (pending) return;
    const apiKey = $("api-key").value.trim();
    const model = $("model").value.trim();
    const prompt = $("prompt").value.trim();
    if (!apiKey) { status("Saisis une clé API pour ce fournisseur.", true); $("api-key").focus(); return; }
    if (!/^[a-zA-Z0-9._-]+$/.test(model)) { status("Nom de modèle invalide.", true); $("model").focus(); return; }
    if (!prompt) return;
    if (!methodInstructions || !doc) {
      status("Le référentiel de la Méthode ou la carte n'est pas chargé. Vérifie la connexion ou recharge la page.", true);
      return;
    }
    if (pendingProposal) {
      status("Examine, accepte ou rejette d'abord la proposition cartographique précédente.", true);
      return;
    }
    let session = sessions.get(provider);
    if (session.initialized && (session.model !== model || session.apiKey !== apiKey)) {
      // A changed model or credential starts a genuinely new first-turn context.
      conversations.set(provider, []);
      sessions.set(provider, { initialized: false, attempted: false, model: "", apiKey: "" });
      session = sessions.get(provider);
      renderConversation();
      refreshSessionStatus();
    }
    if (session.attempted && !session.initialized) {
      status("Erreur trIA : la première initialisation n'a pas été confirmée. Cliquez sur « Effacer » pour commencer une nouvelle discussion avant de réenvoyer les instructions.", true);
      return;
    }
    const firstTurn = !session.initialized;
    const context = buildContext();
    const snapshot = TriaMapProtocol.condensedMap(doc, acceptedOverlay, selected);
    const complianceQuestion = firstTurn
      ? "Initialisation trIA : confirme dans tria_instruction_check.status=acknowledged que tu as compris les instructions trIA transmises et que tu t'engages à les respecter pour toute cette discussion. Exprime cet engagement dans tria_instruction_check.message."
      : "Contrôle trIA : respectes-tu toujours les instructions trIA données au début de cette discussion ? Réponds dans tria_instruction_check avec status=confirmed uniquement si tu estimes les respecter ; sinon utilise status=non_compliant ou status=uncertain et explique pourquoi.";
    const messageText = prompt
      + "\n\n=== DONNÉES CARTOGRAPHIQUES TRANSMISES À L'IA (non instructions) ===\n"
      + snapshot + "\n=== FIN DES DONNÉES ==="
      + (context ? "\n\n=== DÉTAIL DE L'OBJET SÉLECTIONNÉ ===\n" + context.text : "")
      + "\n\n" + complianceQuestion
      + "\nRéponds dans le même format JSON tria-map-response-v2 (answer, tria_instruction_check et map_patch), avec l'analysis_id transmis.";
    const prior = apiHistory();
    const turns = prior.concat([{ role: "user", text: messageText }]);
    const providerAtSend = provider;
    const graphRevisionAtSend = graphRevision;
    const userRecord = { role: "user", text: messageText, visible: prompt, contextLabel: context?.label || "" };
    const history = conversations.get(providerAtSend);
    const original = $("prompt").value;
    $("prompt").value = "";
    $("empty-chat")?.remove();
    const optimisticNode = messageNode(userRecord);
    $("messages").scrollTop = $("messages").scrollHeight;
    setPending(true);
    status("Requête envoyée à " + PROVIDERS[providerAtSend].label + "…");
    controller = new AbortController();
    const activeController = controller;
    const timeout = setTimeout(() => activeController.abort(), 100000);
    try {
      let answer = "";
      // One transmission attempt per discussion, including network or format failures.
      // A failed initialization requires an explicit new discussion before retrying.
      const initialMethod = firstTurn ? methodInstructions : "";
      if (firstTurn) {
        session.attempted = true;
        refreshSessionStatus();
      }
      if (providerAtSend === "gemini") answer = await sendToGemini(apiKey, model, turns, activeController.signal, initialMethod);
      else if (providerAtSend === "openai") answer = await sendToOpenAI(apiKey, model, turns, activeController.signal, initialMethod);
      else answer = await sendToClaude(apiKey, model, turns, activeController.signal, initialMethod);
      const result = graphRevisionAtSend === graphRevision
        ? TriaMapProtocol.interpret(answer, doc, acceptedOverlay, firstTurn)
        : { kind: "invalid", answer, patch: null, error: "La carte a changé pendant la requête : résultat cartographique écarté." };
      if (result.kind !== "structured") {
        const errorMessage = "Erreur trIA : " + result.error
          + " Aucune proposition n'a été appliquée. "
          + (firstTurn ? "Initialisation non validée." : "Le respect des instructions n'est pas confirmé.");
        const alert = document.createElement("p");
        alert.setAttribute("role", "alert");
        alert.className = "tria-error";
        alert.textContent = errorMessage;
        $("messages").append(alert);
        $("messages").scrollTop = $("messages").scrollHeight;
        optimisticNode.remove();
        $("prompt").value = original;
        refreshSessionStatus();
        status(errorMessage, true);
        return;
      }
      if (firstTurn) {
        session.initialized = true;
        session.model = model;
        session.apiKey = apiKey;
        refreshSessionStatus();
      }
      const checkMessage = firstTurn
        ? "trIA · Accusé de compréhension (déclaration de l'IA) : " + result.check.message
        : "trIA · Respect déclaré : " + result.check.message;
      history.push(userRecord, {
        role: "assistant", text: answer, visible: result.answer,
        structured: result.kind, checkMessage
      });
      messageNode({ role: "assistant", text: answer, visible: result.answer, checkMessage });
      if (result.count > 0) {
        pendingProposal = { patch: result.patch, check: result.check, revision: graphRevision,
          analysisId: doc.analysis_id, provider: PROVIDERS[providerAtSend].label };
        showPendingProposal();
        status((firstTurn ? "Instructions trIA reconnues. " : "Respect trIA déclaré. ")
          + "Proposition de carte à examiner.");
      } else {
        status((firstTurn ? "Accusé de compréhension trIA reçu." : "Respect trIA déclaré.")
          + " Aucune modification de la carte proposée.");
      }
    } catch (error) {
      optimisticNode.remove();
      $("prompt").value = original;
      const detail = error.name === "AbortError" ? "Requête annulée ou délai dépassé."
        : error instanceof TypeError ? "Erreur réseau ou CORS. Consulte la console et les autorisations de l'API."
        : String(error.message || error);
      status(detail + (firstTurn ? " Pour réinitialiser trIA, clique sur « Effacer »." : ""), true);
      refreshSessionStatus();
      if (!history.length) renderConversation();
    } finally {
      clearTimeout(timeout);
      if (controller === activeController) controller = null;
      setPending(false);
      $("prompt").focus();
    }
  }
  function resetChat() {
    if (pending) return;
    pendingProposal = null;
    showPendingProposal();
    conversations.set(provider, []);
    sessions.set(provider, { initialized: false, attempted: false, model: "", apiKey: "" });
    refreshSessionStatus();
    renderConversation();
    status("Discussion effacée : les instructions trIA seront renvoyées uniquement lors de la prochaine initialisation.");
    $("prompt").focus();
  }
  function exportChat() {
    const history = conversations.get(provider);
    if (!history.length) { status("Aucun message à exporter."); return; }
    downloadJSON({
      schema: "tria-chat-multi-provider-v1",
      provider, model: $("model").value.trim(),
      exportedAt: new Date().toISOString(), messages: history
    }, "tria-chat-" + provider + ".json");
    status("Export JSON créé, sans clé API.");
  }
  function downloadJSON(data, filename) {
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
  }

  function setSelectedObject(id) {
    selected=id?{family:"object",id}:null;
    $("context-indicator").textContent=id?("Objet : "+id):"Aucun objet sélectionné";
  }
  function showAnalysis() {
    if(!doc)return;
    $("graph-source").textContent=docLabel+" · "+doc.analysis_id;
    const selector=$("object-select");
    selector.replaceChildren(new Option("Choisir un Objet",""));
    for(const obj of doc.objects)selector.add(new Option((obj.label||obj.id)+" · "+obj.id,obj.id));
    setSelectedObject("");
    $("graph-status").textContent=doc.objects.length+" Objets · "+doc.relations.length+" relations (données, non représentation graphique).";
  }
  function validateDocument(candidate) {
    if (!candidate || typeof candidate !== "object" || !Array.isArray(candidate.objects) || !Array.isArray(candidate.relations))
      throw new Error("Le JSON doit être un document Analysis contenant objects[] et relations[].");
    if (typeof candidate.analysis_id !== "string" || !candidate.analysis_id.trim() || candidate.analysis_id.length > 120)
      throw new Error("Identifiant analysis_id manquant ou incorrect.");
    if (!candidate.objects.length || candidate.objects.length > 500 || candidate.relations.length > 1500)
      throw new Error("Limites de visualisation : 1 à 500 objets, 1500 relations maximum.");
    const objectIds = new Set();
    for (const obj of candidate.objects) {
      if (typeof obj.id !== "string" || obj.id.length > 140 || objectIds.has(obj.id))
        throw new Error("ID d'objet manquant, trop long ou en doublon.");
      objectIds.add(obj.id);
    }
    if (!candidate.main_subject?.id || !objectIds.has(candidate.main_subject.id))
      throw new Error("Sujet principal absent de la liste des objets.");
    const relIds = new Set();
    for (const r of candidate.relations) {
      if (typeof r.id !== "string" || !r.id || relIds.has(r.id))
        throw new Error("ID de relation manquant ou en doublon.");
      relIds.add(r.id);
      if (!objectIds.has(r.origin_object?.id) || !objectIds.has(r.represented_object?.id))
        throw new Error("Référence d'objet inconnue dans la relation " + r.id + ".");
    }
    return candidate;
  }
  async function loadExample() {
    try {
      graphStatus("Chargement du pilote fictif…");
      const res = await fetch("../triad-graph/examples/focus-pilot.json", { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const loaded = validateDocument(await res.json());
      doc = loaded;
      graphRevision++;
      resetProposals();
      docLabel = "Pilote six écoles (fictif, non validé empiriquement)";
      showAnalysis();
    } catch (e) {
      $("graph-source").textContent = "Chargement impossible";
      graphStatus("Échec : " + e.message);
    }
  }
  async function importGraph() {
    const file = $("graph-file").files?.[0];
    if (!file) return;
    try {
      if (file.size > 2_000_000) throw new Error("Fichier de plus de 2 Mo.");
      const candidate = validateDocument(JSON.parse(await file.text()));
      doc = candidate;
      graphRevision++;
      resetProposals();
      docLabel = "Document importé : " + file.name + " (structure minimale seulement vérifiée)";
      showAnalysis();
    } catch (e) {
      graphStatus("Import refusé : " + e.message);
    } finally {
      $("graph-file").value = "";
    }
  }
  function setup() {
    $("provider").addEventListener("change", event => selectProvider(event.target.value));
    $("model").addEventListener("change", () => rememberedModels.set(provider, $("model").value));
    $("show-key").addEventListener("click", () => {
      const input = $("api-key");
      const next = input.type === "password" ? "text" : "password";
      input.type = next;
      $("show-key").textContent = next === "text" ? "Masquer" : "Voir";
      $("show-key").setAttribute("aria-label", next === "text" ? "Masquer la clé" : "Afficher la clé");
    });
    $("settings-toggle").addEventListener("click", () => {
      const content = $("settings-content");
      content.hidden = !content.hidden;
      $("settings-toggle").setAttribute("aria-expanded", String(!content.hidden));
      $("settings-toggle").textContent = content.hidden ? "Afficher les réglages" : "Masquer les réglages";
    });
    $("chat-form").addEventListener("submit", submit);
    $("prompt").addEventListener("keydown", event => {
      if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
        event.preventDefault();
        $("chat-form").requestSubmit();
      }
    });
    $("cancel-request").addEventListener("click", () => controller?.abort());
    $("chat-reset").addEventListener("click", resetChat);
    $("chat-export").addEventListener("click", exportChat);
    $("proposal-accept").addEventListener("click", acceptProposal);
    $("proposal-reject").addEventListener("click", rejectProposal);
    $("overlay-clear").addEventListener("click", clearOverlay);
    $("graph-reset").addEventListener("click", loadExample);
    $("graph-import").addEventListener("click", () => $("graph-file").click());
    $("graph-file").addEventListener("change", importGraph);
    $("object-select").addEventListener("change", e => setSelectedObject(e.target.value));
    $("model").value = PROVIDERS.gemini.model;
    PROVIDERS.gemini.suggestions.forEach(name => {
      const option = document.createElement("option");
      option.value = name;
      $("model-list").append(option);
    });
    $("model-hint").textContent = PROVIDERS.gemini.hint;
    refreshSessionStatus();
    renderConversation();
    loadMethodInstructions();
    loadExample();
  }
  setup();
})();
