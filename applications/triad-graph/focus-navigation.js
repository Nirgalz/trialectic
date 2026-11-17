/* UI-only navigation experiment. Never writes Analysis, Object or PowerEvaluation data. */
(function (root, make) {
  const api = make();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.TriaFocusNavigation = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function createNavigationState() {
    let mode = 'simple', focus = null, history = [];
    function record(type, target = null, detail = '') {
      history.push({seq: history.length + 1, type, target: target ? {...target} : null, detail});
    }
    function normalise(target) {
      if (!target || !['object', 'scenario'].includes(target.family) ||
          typeof target.id !== 'string' || !target.id.trim()) return null;
      return {family: target.family, id: target.id, version: target.version || null};
    }
    return {
      get mode() { return mode; },
      get focus() { return focus ? {...focus} : null; },
      get history() { return history.map(x => ({...x, target: x.target ? {...x.target} : null})); },
      get selectionCount() { return history.filter(x => x.type === 'select').length; },
      setMode(value) {
        if (!['simple','persistent'].includes(value)) throw Error('Unknown navigation mode');
        if (value === mode) return;
        mode = value;
        // Switching into one-click inspection ends the persistent steering session.
        focus = null;
        record('mode', null, value);
      },
      select(target) {
        const ref = normalise(target);
        if (mode !== 'persistent' || !ref) return false;
        focus = ref;
        record('select', ref);
        return true;
      },
      clear() {
        if (!focus) return false;
        record('clear', focus);
        focus = null;
        return true;
      },
      inspect(target) {
        const ref = target && typeof target.family === 'string'
          ? {family: target.family, id: String(target.id)} : null;
        record('inspect', ref);
      },
      operation(name) { record('ui_operation', null, String(name)); },
      reset() { mode = 'simple'; focus = null; history = []; }
    };
  }
  return {createNavigationState};
});
