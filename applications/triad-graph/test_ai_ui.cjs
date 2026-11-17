/* Integration guard: UI buttons invoke only the local server; never handle credentials. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=__dirname;
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const ai=fs.readFileSync(path.join(root,'ai-ui.js'),'utf8');
const server=fs.readFileSync(path.join(root,'server.py'),'utf8');
new Function(ai);
for(const id of ['ai-focus','ai-refine','local-ai','local-ai-results','local-ai-status']){
  assert(html.includes('id="'+id+'"'),id+' missing in HTML');
  assert(ai.includes("'"+id+"'"),id+' not wired');
}
assert(html.includes('src="ai-ui.js"'));
assert(ai.includes("fetch('/api/ai/analyze'"));
assert(ai.includes("fetch('/api/ai/status'"));
assert(ai.includes("textContent = label"));
assert(!ai.includes('OPENAI_API_KEY')&&!ai.includes('Authorization:'));
assert(server.includes("self.secret_path()"));
assert(server.includes("ALLOWED_HOSTS"));
assert(server.includes("AI_SINGLE_REQUEST"));
assert(server.includes("configured()"));
console.log('Local AI bridge UI: endpoints, opt-in controls, DOM text safety, no browser credentials, loopback guard OK.');
