"""Author synthetic inputs for an exploratory navigation test, not real advice."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
ref = lambda oid: {'id': oid, 'version': 'v1'}
items = [
 ('O-commune','system','Commune · six écoles'),
 ('O-ecoles','group','Six écoles · continuité scolaire'),
 ('O-eleves','group','Élèves · dont 120 vulnérables (hypothèse)'),
 ('O-agents','group','Agents et enseignants'),
 ('O-riverains','group','Riverains des écoles'),
 ('O-reseau','system','Réseau électrique local'),
 ('O-prestataire','group','Prestataire technique'),
 ('N-continuite','semantic_object','NEED · continuité scolaire'),
 ('N-budget','semantic_object','NEED · préserver la capacité budgétaire'),
 ('N-sante','semantic_object','NEED · protéger les élèves de la chaleur'),
 ('N-charge','semantic_object','NEED · charge de travail soutenable'),
 ('N-calme','semantic_object','NEED · repos des riverains'),
 ('N-reserve','semantic_object','NEED · maintenir la réserve électrique'),
 ('C-horaires','semantic_object','CAN · décaler les horaires'),
 ('C-clim','semantic_object','CAN · installer un refroidissement actif'),
 ('C-ombre','semantic_object','CAN · ombrager et ventiler'),
 ('C-renover','semantic_object','CAN · rénover les bâtiments')]
doc = dict(schema_version='2.0.0', analysis_id='A-focus-six-ecoles-pilot',
 main_subject=ref('O-commune'), secondary_subjects=[ref(x) for x in ['O-eleves','O-agents','O-riverains']],
 environment=[ref(x) for x in ['O-ecoles','O-reseau','O-prestataire']], focus={'type':'Scenario','scenario_id':'S-02'})
for name in ['objects','definitions','relations','conditions','pathways','inventories','scenarios','events','condition_assessments','power_assessments','effects','claims','evidence_items','evidence_reviews','claim_assessments']:
 doc[name]=[]
for oid,category,label in items:
 doc['objects'].append(dict(id=oid,category=category,label=label,parent_id=None,temporary_child_ids=[],actualised_child_ids=[]))
 doc['definitions'].append(dict(object_id=oid,version='v1',constituents=[],properties={},relation_refs=[],notes='Identité synthétique locale ; aucune constatation réelle.'))
definitions={d['object_id']:d for d in doc['definitions']}
def relation(rid,bearer,target,kind,links=()):
 r=dict(id=rid,version='v1',type=kind,origin_object=ref(bearer),represented_object=ref(target),NEEDs=None,CANs=None,
  description='Hypothèse de travail du cas fictif ; attribution non établie empiriquement.',relation={'nature':[],'links':[]})
 for index,(oid,role) in enumerate(links):
  source='NEEDs' if oid.startswith('N-') else 'CANs'
  if r[source] is None:r[source]=[]
  r[source].append(ref(oid))
  r['relation']['links'].append(dict(id=f'L-{rid}-{index}',object_id=oid,source_list=source,roles=[role],causality='indeterminate',mechanism='Contribution ou contrainte postulée pour le test ; à examiner.'))
 doc['relations'].append(r);definitions[bearer]['relation_refs'].append(ref(rid));return r
relation('R-continuite','O-commune','N-continuite','NEED',[('C-horaires','contributive'),('C-clim','contributive'),('C-ombre','contributive')])
relation('R-budget','O-commune','N-budget','NEED',[('C-clim','inhibitory'),('C-renover','inhibitory')])
relation('R-sante','O-eleves','N-sante','NEED',[('C-clim','contributive'),('C-ombre','contributive'),('C-horaires','contributive')])
relation('R-charge','O-agents','N-charge','NEED',[('C-horaires','inhibitory')])
relation('R-calme','O-riverains','N-calme','NEED',[('C-clim','inhibitory')])
relation('R-reserve','O-reseau','N-reserve','NEED',[('C-clim','inhibitory')])
relation('R-horaires','O-commune','C-horaires','CAN',[('N-continuite','contributive')])
relation('R-clim','O-commune','C-clim','CAN',[('N-sante','contributive'),('N-continuite','contributive')])
relation('R-ombre','O-commune','C-ombre','CAN',[('N-sante','contributive')])
relation('R-renover','O-commune','C-renover','CAN',[('N-sante','contributive')])
definitions['O-commune']['constituents']=[ref('O-ecoles')]
conditions=[('K-puissance','R-clim','O-reseau','reserve_suffisante'),('K-delai','R-clim','O-prestataire','livraison_avant_canicule'),
 ('K-bruit','R-clim','O-riverains','bruit_acceptable'),('K-finance','R-clim','O-commune','financement_disponible'),
 ('K-transport','R-horaires','O-commune','transport_compatible'),('K-personnel','R-horaires','O-agents','accord_personnel'),
 ('K-ventilation','R-ombre','O-ecoles','ventilation_nuit_sure')]
for cid,rid,oid,prop in conditions:
 definitions[oid]['properties'][prop]={'description':'Prérequis fictif à vérifier dans ce pilote.'}
 doc['conditions'].append(dict(id=cid,owner_relation=ref(rid),target='actionability',predicate={'object':ref(oid),'property':prop,'operator':'equals','value':True},notes='Prérequis proposé ; inventaire incomplet.'))
scenarioNotes={
 'S-01':['Horaires décalés ; coût supposé limité, transport et accord du personnel à vérifier.'],
 'S-02':['Refroidissement actif des six écoles. Coût fictif : 420 000 € ; enveloppe supposée : 300 000 €. Délai supposé : 8 semaines ; épisode chaud supposé dans 3 semaines. Réserve électrique, bruit et efficacité non vérifiés.'],
 'S-03':['Ombrage et ventilation. Coût fictif : 90 000 € ; délai supposé : 2 semaines. Efficacité dans les salles les plus exposées non établie.'],
 'S-04':['Combinaison : ombrage immédiat, horaires adaptés localement, refroidissement ciblé des salles prioritaires, rénovation ultérieure. Coût, périmètre, charge des agents et efficacité restent à examiner.']}
# Explicit, authored scopes for this synthetic example, not AI relevance scores.
# Include affected secondary Subjects as well as the contemplated intervention.
scopes={
 'S-01':['O-commune','O-ecoles','O-eleves','O-agents','N-continuite','N-budget','N-sante','N-charge','C-horaires'],
 'S-02':['O-commune','O-ecoles','O-eleves','O-riverains','O-reseau','O-prestataire','N-continuite','N-budget','N-sante','N-calme','N-reserve','C-clim'],
 'S-03':['O-commune','O-ecoles','O-eleves','O-agents','N-continuite','N-budget','N-sante','N-charge','C-ombre'],
 'S-04':[x[0] for x in items]}
for sid,assumptions in scenarioNotes.items():
 doc['scenarios'].append(dict(id=sid,parent_scenario_id=None,mode='hypothetical',object_heads=[ref(oid) for oid in scopes[sid]],states=[],event_ids=[],assumptions=['Tout le cas est fictif ; chiffres non documentés, destinés à tester le pilotage.']+assumptions,notes='Périmètre exploratoire explicitement délimité pour ce cas ; révisable. Aucune Actualisation ni conclusion de Puissance enregistrée.'))
for cid,rid,oid,prop in conditions:
 status='unsatisfied' if cid in ['K-finance','K-delai'] else 'indeterminate'
 doc['condition_assessments'].append(dict(id='CA-'+cid,scenario_id='S-02',condition={'kind':'condition','id':cid,'owner_id':rid,'version':'v1'},at='2026-11-17T10:00:00+01:00',status=status,evidence_ids=[]))
(ROOT/'focus-pilot.json').write_text(json.dumps(doc,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(ROOT/'focus-pilot.json')
