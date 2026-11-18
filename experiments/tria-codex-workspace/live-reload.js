/* Live reload for the local development workspace. */
(() => {
  const loaded = new URL(document.currentScript.src).searchParams.get("v");

  async function checkRevision() {
    try {
      const response = await fetch("/workspace/revision", {
        cache: "no-store",
        signal: AbortSignal.timeout(3000)
      });
      if (response.ok) {
        const { revision } = await response.json();
        if (revision && revision !== loaded) {
          location.reload();
          return;
        }
      }
    } catch {
      // The development server may be restarting. Try again on the next poll.
    }
    setTimeout(checkRevision, 1000);
  }

  checkRevision();
})();
