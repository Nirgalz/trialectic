/* trIA multi-provider client. Static browser-only prototype, no secret storage. */
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
  const rememberedKeys = new Map(); // Mémoire volatile, jamais localStorage ni sessionStorage.
  const rememberedModels = new Map(Object.entries(PROVIDERS).map(pair => [pair[0], pair[1].model]));
  let provider = "gemini";
  let controller = null;
  let pending = false;
  let doc = null;
  let docLabel = "";
  let selected = null;
  let cy = null;
  let graphResizeObserver = null;
  let layoutIsGrid = false;
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
    $("conversation-hint").textContent = "Conversation " + PROVIDERS[value].label + " · locale à cet onglet";
    renderConversation();
    status("Fournisseur actif : " + PROVIDERS[value].label + ". Les conversations restent séparées.");
  }
  function setPending(value) {
    pending = value;
    ["provider", "model", "api-key", "chat-reset", "chat-export", "show-key"].forEach(id => $(id).disabled = value);
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
    const data = await apiCall(
      "https://generativelanguage.googleapis.com/v1beta/models/" + encodeURIComponent(model) + ":generateContent",
      { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      { systemInstruction: { parts: [{ text: method }] }, contents: turns.map(turn => ({
        role: turn.role === "assistant" ? "model" : "user",
        parts: [{ text: turn.text }]
      })) },
      signal
    );
    const text = (data.candidates?.[0]?.content?.parts || [])
      .filter(part => typeof part.text === "string").map(part => part.text).join("\n").trim();
    if (!text) throw new Error("Aucun texte Gemini. Motif : " + (data.candidates?.[0]?.finishReason || data.promptFeedback?.blockReason || "indéterminé"));
    return text;
  }
  async function sendToOpenAI(apiKey, model, turns, signal, method) {
    const data = await apiCall(
      "https://api.openai.com/v1/responses",
      { "Authorization": "Bearer " + apiKey, "Content-Type": "application/json" },
      { model, store: false, instructions: method, input: turns.map(turn => ({
        role: turn.role, content: turn.text
      })) },
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
        model, max_tokens: 4096, system: method,
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
  function buildContext() {
    if (!$("include-graph").checked || !doc || !selected) return null;
    const main = doc.objects.find(item => item.id === doc.main_subject?.id);
    const prefix = [
      "EXTRAIT DU GRAPHE trIA. Source : " + docLabel + ".",
      "Analyse : " + (doc.analysis_id || "non renseignée") + ".",
      "Sujet principal : " + (main?.label || doc.main_subject?.id || "non renseigné") + ".",
      "Ces enregistrements décrivent un modèle d'analyse ; ils ne constituent pas nécessairement des faits.",
      "Aucune Actualisation n'est déduite de la carte."
    ];
    if (selected.family === "object") {
      const item = doc.objects.find(obj => obj.id === selected.id);
      if (!item) return null;
      prefix.push("Objet sélectionné : " + item.id + " — " + (item.label || "") + ". Catégorie : " + (item.category || "non renseignée") + ".");
      const definition = (doc.definitions || []).find(d => d.object_id === item.id);
      if (definition) prefix.push("Définition et propriétés enregistrées : " + JSON.stringify(definition).slice(0, 2400));
      const related = doc.relations.filter(r => r.origin_object?.id === item.id ||
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
      const r = doc.relations.find(item => item.id === selected.id);
      if (!r) return null;
      prefix.push("Relation sélectionnée : " + JSON.stringify(r).slice(0, 5700));
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
    const context = buildContext();
    const messageText = context ? prompt + "\n\n---\n" + context.text : prompt;
    const prior = apiHistory();
    const turns = prior.concat([{ role: "user", text: messageText }]);
    const providerAtSend = provider;
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
      if (providerAtSend === "gemini") answer = await sendToGemini(apiKey, model, turns, activeController.signal);
      else if (providerAtSend === "openai") answer = await sendToOpenAI(apiKey, model, turns, activeController.signal);
      else answer = await sendToClaude(apiKey, model, turns, activeController.signal);
      history.push(userRecord, { role: "assistant", text: answer });
      messageNode({ role: "assistant", text: answer });
      status("Réponse reçue de " + PROVIDERS[providerAtSend].label + " · " + model);
    } catch (error) {
      optimisticNode.remove();
      $("prompt").value = original;
      const detail = error.name === "AbortError" ? "Requête annulée ou délai dépassé."
        : error instanceof TypeError ? "Erreur réseau ou CORS. Consulte la console et les autorisations de l'API."
        : String(error.message || error);
      status(detail, true);
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
    conversations.set(provider, []);
    renderConversation();
    status("Discussion " + PROVIDERS[provider].label + " effacée en mémoire.");
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

  function objectKind(item) {
    if (item.id === doc.main_subject?.id) return "main";
    if (/^C-/.test(item.id)) return "can";
    if (/^N-/.test(item.id)) return "need";
    return "other";
  }
  function graphElements() {
    const ids = new Set(doc.objects.map(item => item.id));
    const nodes = doc.objects.map(item => ({
      data: { id: "obj:" + item.id, label: item.label || item.id, kind: objectKind(item), family: "object", recordId: item.id }
    }));
    const edges = [];
    let i = 0;
    for (const r of doc.relations) {
      if (!r.id || !ids.has(r.origin_object?.id) || !ids.has(r.represented_object?.id)) continue;
      nodes.push({ data: {
        id: "rel:" + r.id, label: (r.type || "Relation") + "\n" + r.id,
        kind: "relation", family: "relation", recordId: r.id
      }});
      edges.push({ data: { id: "e:" + (++i), source: "obj:" + r.origin_object.id, target: "rel:" + r.id, kind: "origin" } });
      edges.push({ data: { id: "e:" + (++i), source: "rel:" + r.id, target: "obj:" + r.represented_object.id, kind: "represented" } });
      const linked = [...(r.CANs || []), ...(r.NEEDs || [])];
      const seen = new Set();
      for (const ref of linked) {
        if (!ids.has(ref.id) || seen.has(ref.id)) continue;
        seen.add(ref.id);
        const link = (r.relation?.links || []).find(l => l.object_id === ref.id);
        const roles = link?.roles || [];
        const kind = roles.includes("inhibitory") ? "inhibitory"
          : roles.includes("contributive") ? "contributive" : "linked";
        edges.push({ data: { id: "e:" + (++i), source: "obj:" + ref.id, target: "rel:" + r.id, kind } });
      }
    }
    return nodes.concat(edges);
  }
  const styles = [
    { selector: "node", style: {
      "background-color": "#a797c7", "border-color": "#ddd4ed", "border-width": 1.4,
      "color": "#ebf6f5", "label": "data(label)", "text-wrap": "wrap",
      "text-max-width": "102px", "text-valign": "center", "text-halign": "center",
      "font-size": 10.5, "font-weight": 650, "text-outline-color": "#10202a",
      "text-outline-width": 1.3, "width": 115, "height": 60,
      "shape": "round-rectangle", "padding": "7px", "overlay-opacity": 0
    }},
    { selector: 'node[kind="main"]', style: { "background-color": "#277c67", "border-color": "#a0f7d5", "border-width": 3, "width": 139, "height": 76 }},
    { selector: 'node[kind="can"]', style: { "background-color": "#2a608b", "border-color": "#90befe" }},
    { selector: 'node[kind="need"]', style: { "background-color": "#875c3a", "border-color": "#ffd49c" }},
    { selector: 'node[kind="relation"]', style: {
      "background-color": "#334b55", "border-color": "#6c95a5",
      "shape": "diamond", "width": 87, "height": 76, "font-size": 9, "text-max-width": "70px"
    }},
    { selector: "edge", style: {
      "width": 1.5, "line-color": "#5a8793", "target-arrow-color": "#5a8793",
      "curve-style": "bezier", "opacity": 0.78, "target-arrow-shape": "triangle",
      "arrow-scale": .73
    }},
    { selector: 'edge[kind="origin"]', style: { "line-color": "#6f9c99", "target-arrow-shape": "none" }},
    { selector: 'edge[kind="inhibitory"]', style: {
      "line-color": "#de9b88", "target-arrow-color": "#de9b88", "line-style": "dashed"
    }},
    { selector: 'edge[kind="contributive"]', style: {
      "line-color": "#a6b7ce", "target-arrow-color": "#a6b7ce", "line-style": "dashed"
    }},
    { selector: 'edge[kind="linked"]', style: { "line-style": "dotted", "line-color": "#b9a7aa" }},
    { selector: 'node.dim, edge.dim', style: { "opacity": 0.17 }},
    { selector: 'node.highlight', style: { "border-color": "#f5e9a9", "border-width": 4, "z-index": 100 }},
    { selector: 'edge.highlight', style: { "opacity": 1, "width": 2.5, "z-index": 50 }}
  ];

  function setSelection(next) {
    selected = next;
    if (!cy || !next) {
      if (cy) cy.elements().removeClass("dim highlight");
      $("selection-title").textContent = "Sélectionne un nœud";
      $("selection-detail").textContent = "Clique sur un objet ou une relation pour en consulter les données et les liens.";
      $("context-indicator").textContent = "Aucun nœud sélectionné";
      return;
    }
    const id = (next.family === "object" ? "obj:" : "rel:") + next.id;
    const node = cy.getElementById(id);
    if (!node.length) return;
    cy.elements().addClass("dim").removeClass("highlight");
    const edges = node.connectedEdges();
    const neighbourhood = edges.connectedNodes().union(node);
    neighbourhood.removeClass("dim");
    edges.removeClass("dim");
    edges.addClass("highlight");
    node.addClass("highlight");
    cy.animate({ center: { eles: node }, duration: 180 });
    $("context-indicator").textContent = next.id + " · " + (next.family === "object" ? "objet" : "relation");
    const record = next.family === "object"
      ? doc.objects.find(o => o.id === next.id)
      : doc.relations.find(r => r.id === next.id);
    $("selection-title").textContent = next.family === "object" ? (record?.label || next.id) : next.id + " · relation";
    const detail = $("selection-detail");
    detail.replaceChildren();
    const dl = document.createElement("dl");
    function field(name, value) {
      const dt = document.createElement("dt");
      dt.textContent = name;
      const dd = document.createElement("dd");
      dd.textContent = typeof value === "string" ? value : JSON.stringify(value);
      dl.append(dt, dd);
    }
    field("ID", next.id);
    if (next.family === "object") {
      field("Catégorie", record?.category || "Non renseignée");
      const refs = doc.relations.filter(r =>
        r.origin_object?.id === next.id || r.represented_object?.id === next.id ||
        (r.CANs || []).some(x => x.id === next.id) || (r.NEEDs || []).some(x => x.id === next.id)
      ).map(r => r.id);
      field("Relations associées", refs.length ? refs.join(", ") : "Aucune");
      const def = (doc.definitions || []).find(d => d.object_id === next.id);
      if (def?.properties) field("Propriétés déclarées", Object.keys(def.properties).join(", ") || "Aucune");
    } else {
      field("Type", record?.type || "Non renseigné");
      field("Origine", record?.origin_object?.id || "?");
      field("Objet représenté", record?.represented_object?.id || "?");
      field("CANs liés", (record?.CANs || []).map(x => x.id).join(", ") || "Aucun");
      field("NEEDs liés", (record?.NEEDs || []).map(x => x.id).join(", ") || "Aucun");
      field("Description", record?.description || "Sans description");
    }
    detail.append(dl);
  }
  function showGraph() {
    if (typeof cytoscape !== "function") {
      graphStatus("Erreur : bibliothèque Cytoscape.js indisponible.");
      return;
    }
    if (graphResizeObserver) graphResizeObserver.disconnect();
    if (cy) cy.destroy();
    const elements = graphElements();
    cy = cytoscape({
      container: $("cy"), elements, style: styles,
      wheelSensitivity: 0.2,
      minZoom: 0.2, maxZoom: 2.7,
      layout: {
        name: "cose", animate: false, fit: true, padding: 38,
        nodeRepulsion: () => 80000, idealEdgeLength: () => 110, edgeElasticity: () => 80,
        gravity: 0.22, numIter: 750, randomize: false
      }
    });
    cy.on("tap", "node", evt => {
      setSelection({ family: evt.target.data("family"), id: evt.target.data("recordId") });
    });
    cy.on("tap", evt => {
      if (evt.target === cy) setSelection(null);
    });
    setSelection(null);
    $("graph-count").textContent = doc.objects.length + " objets · " + doc.relations.length + " relations";
    graphStatus("Carte interactive, en lecture seule · " + elements.length + " éléments.");
    if (typeof ResizeObserver !== "undefined") {
      const parent = $("cy");
      graphResizeObserver = new ResizeObserver(() => { if (cy && cy.container() === parent) cy.resize(); });
      graphResizeObserver.observe(parent);
    }
    requestAnimationFrame(() => { cy?.resize(); cy?.fit(undefined, 34); });
  }
  function validateDocument(candidate) {
    if (!candidate || typeof candidate !== "object" || !Array.isArray(candidate.objects) || !Array.isArray(candidate.relations))
      throw new Error("Le JSON doit être un document Analysis contenant objects[] et relations[].");
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
      doc = validateDocument(await res.json());
      docLabel = "Pilote six écoles (fictif, non validé empiriquement)";
      $("graph-source").textContent = docLabel;
      showGraph();
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
      docLabel = "Document importé : " + file.name + " (structure minimale seulement vérifiée)";
      $("graph-source").textContent = docLabel;
      showGraph();
    } catch (e) {
      graphStatus("Import refusé : " + e.message);
    } finally {
      $("graph-file").value = "";
    }
  }
  function switchTab(next) {
    document.body.setAttribute("data-mobile-view", next);
    $("tab-chat").setAttribute("aria-pressed", String(next === "chat"));
    $("tab-map").setAttribute("aria-pressed", String(next === "map"));
    if (next === "map" && cy) requestAnimationFrame(() => { cy.resize(); cy.fit(undefined, 36); });
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
    $("graph-reset").addEventListener("click", loadExample);
    $("graph-import").addEventListener("click", () => $("graph-file").click());
    $("graph-file").addEventListener("change", importGraph);
    $("graph-zoom-in").addEventListener("click", () => cy?.zoom(Math.min(cy.zoom() * 1.2, cy.maxZoom())));
    $("graph-zoom-out").addEventListener("click", () => cy?.zoom(Math.max(cy.zoom() / 1.2, cy.minZoom())));
    $("graph-fit").addEventListener("click", () => cy?.fit(undefined, 35));
    $("graph-layout").addEventListener("click", () => {
      if (!cy) return;
      layoutIsGrid = !layoutIsGrid;
      const layout = layoutIsGrid
        ? { name: "grid", fit: true, padding: 35, avoidOverlap: true, animate: false }
        : { name: "cose", fit: true, padding: 35, animate: false, numIter: 650, randomize: false };
      cy.layout(layout).run();
      setSelection(null);
    });
    $("tab-chat").addEventListener("click", () => switchTab("chat"));
    $("tab-map").addEventListener("click", () => switchTab("map"));
    $("model").value = PROVIDERS.gemini.model;
    PROVIDERS.gemini.suggestions.forEach(name => {
      const option = document.createElement("option");
      option.value = name;
      $("model-list").append(option);
    });
    $("model-hint").textContent = PROVIDERS.gemini.hint;
    renderConversation();
    loadExample();
  }
  setup();
})();
