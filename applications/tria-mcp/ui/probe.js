import { App } from '@modelcontextprotocol/ext-apps';
const $=id=>document.getElementById(id);
const app=new App({name:'trIA direct channel probe',version:'0.3.0'});
let marker=null,revision=0,contextSent=false;
const state=()=>({marker,revision,contextSent,webmcp:!!document.modelContext?.registerTool,
  hostCapabilities:app.getHostCapabilities()??null});
function render(){ $('value').textContent=marker??'Aucune donnée reçue';$('diagnostic').textContent=JSON.stringify(state(),null,2); }
function register(){
  const mc=document.modelContext;
  if(!mc?.registerTool){$('status').textContent='WebMCP absent : le canal agent → interface ne peut pas être testé dans cet hôte.';render();return;}
  mc.registerTool({name:'tria_probe_set_marker',
    description:'Set a synthetic test marker directly in this UI. Runs in the browser, not on the MCP server.',
    inputSchema:{type:'object',properties:{marker:{type:'string',minLength:1,maxLength:100}},required:['marker'],additionalProperties:false},
    annotations:{readOnlyHint:false,destructiveHint:false},
    async execute(args){
      if(typeof args.marker!=='string'||args.marker.length<1||args.marker.length>100)throw Error('Invalid marker');
      marker=args.marker;revision++;contextSent=false;render();
      return JSON.stringify({accepted:true,...state()});
    }});
  mc.registerTool({name:'tria_probe_get_state',description:'Read this synthetic test UI state directly, without a server call.',
    inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true},
    async execute(){return JSON.stringify(state());}});
  $('status').textContent='Deux outils locaux enregistrés. Leur appel effectif par l’agent reste à vérifier.';
  render();
}
app.ontoolresult=()=>{};
$('context').onclick=async()=>{
  try{
    if(!marker)throw Error('Attendre une donnée reçue de l’agent.');
    await app.updateModelContext({content:[{type:'text',text:'Test trIA : sélection locale du marqueur fictif '+marker}],
      structuredContent:{triaProbe:{marker,revision}}});
    contextSent=true;render();$('status').textContent='Contexte transmis à l’hôte. Sa réception par l’agent reste à vérifier.';
  }catch(e){$('status').textContent=e.message;}
};
$('draft').onclick=async()=>{
  try{
    if(!marker)throw Error('Attendre une donnée reçue de l’agent.');
    if(!app.getHostCapabilities()?.experimental?.['openai/message'])throw Error('Préparation de message non annoncée par cet hôte.');
    await app.sendMessage({role:'user',content:[{type:'text',text:'Test du canal direct trIA : confirme la réception du marqueur fictif '+marker+'.'}],
      _meta:{'openai/message':{target:'active',send:false}}});
    $('status').textContent='Brouillon demandé à l’hôte ; aucun envoi automatique.';
  }catch(e){$('status').textContent=e.message;}
};
render();
try{await app.connect();register();}catch(e){$('status').textContent='Connexion à l’hôte impossible : '+e.message;}
