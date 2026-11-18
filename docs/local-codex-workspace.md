# Local trIA workspace — connected to Codex, without API keys

**Exploratory implementation, 18 November 2026, branch dev.**
The [animated reference map](../applications/triad-graph/README.md)
remains the only graphical implementation.

## Start on Windows

Use Codex CLI signed in with your **ChatGPT account**, not an OpenAI API key.
Install or update using the [official Codex CLI guide](https://developers.openai.com/codex/cli/).

PowerShell, in the local repository checkout:

    git switch dev
    git pull origin dev
    codex --version
    codex login
    codex login status
    python -m pip install -r requirements-test.txt
    python applications/triad-graph/server.py

Open http://127.0.0.1:8765. The **Cycle trIA avec Codex** panel shows
the CLI authentication status. If it reports API-key auth, log out from
Codex and sign back in using ChatGPT. The server explicitly strips
OPENAI_API_KEY, CODEX_API_KEY, and OPENAI_BASE_URL from child processes.

## Exercise the complete interactive Method cycle

1. Load a synthetic pilot or import a valid normative Analysis.
2. Choose a Subject/Focus via the existing graph interaction and Focus controls.
3. Select **Comprendre** in the Codex panel: examine context, definitions,
   relationships, gaps and contradictions.
4. Select **Explorer**: compare multiple possible Resolution Scenarios, their
   dependencies, uncertainty and effects; return to Comprendre if warranted.
5. Select **Décider** only if relevant: clarify tradeoffs and potential next
   choices; the Analyst makes the decision, never the AI automatically.
6. If Codex returns proposed Objects/relations, click **Afficher les propositions
   sur la carte**. Candidates are checked and shown as a reversible overlay
   on the existing animated graph. **Retirer propositions** discards them.
7. Optionally record the Analyst's conclusions through the separate approved
   Method and Analysis revision workflow. No phase or Codex answer automatically
   becomes a normative revision or an effective Actualization.

The local page replays at most 12 recent messages, enabling multiple turns and
movement between phases. It does not use Codex persistent thread IDs.
Refreshing the page resets that history; loading another Analysis also resets it.

## Architecture, authentication and safety

    triad-graph in a local browser
      -> loopback Python server /api/codex/turn
      -> local Codex CLI process (ChatGPT sign-in; read-only sandbox)
      -> Codex's authenticated remote model
      -> local UI response -> optional Analyst-approved temporary map overlay

This **does not run GPT offline**. The server makes no direct OpenAI API call
and requires no API key. The server binds only to 127.0.0.1 and checks Host,
Origin and same-site request context. It accepts only bounded validated Analysis
data, not arbitrary file paths or commands. One Codex turn is allowed at once.
Codex is invoked without a shell, via stdin, in a read-only sandbox with a
bounded runtime and temporary output file. No credentials are stored here.

A model running through Codex can still receive the Analysis and your messages.
Do not submit private content unless you intend to share it with this service.

**Important limitation:** this ChatGPT Web conversation cannot directly write
to or read from your local Codex instance through this bridge. Conversations
started from the local trIA panel use Codex's ChatGPT authentication but are
separate from this existing ChatGPT thread.

For streaming, interrupts and genuine persistent Codex threads, an eventual
Codex app-server adapter would be more appropriate. It is not implemented in
this first prototype. The local CLI and browser integration still need a real
test on the user's own machine; no additional regression suite was added.
