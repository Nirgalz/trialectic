/* Offline Work Local UI integration checks. No external AI/API requirements. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=__dirname;
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const ui=fs.readFileSync(path.join(root,'ai-ui.js'),'utf8');
const server=fs.readFileSync(path.join(root,'server.py'),'utf8');
new Function(ui);
for(const id of ['ai-focus','ai-refine','ai-copy','ai-check','local-ai',
                 'local-ai-request','local-ai-results','local-ai-status']){
  assert(html.includes('id="'+id+'"'),id+' missing in HTML');
  assert(ui.includes("'"+id+"'"),id+' not wired');
}
assert(html.includes('src="ai-ui.js"'));
assert(ui.includes("fetch('/api/work/request'"));
assert(ui.includes("fetch('/api/work/status/"));
assert(ui.includes("textContent=value"),'All external text must be inserted as inert text.');
assert(ui.includes("navigator.clipboard.writeText"));
assert(!ui.includes("api.openai.com"));
assert(server.includes("self.trusted_request()"));
assert(server.includes("from work_bridge import"));
assert(!server.includes("from ai_bridge import"));
assert(!server.includes("api/ai/analyze"));
console.log('Work Local UI: queue endpoints, explicit controls, inert text and no paid API integration OK.');
