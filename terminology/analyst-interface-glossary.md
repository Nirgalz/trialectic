# Analyst interface glossary — Glossaire d'accessibilité FR/EN

**Date:** 2026-11-20  
**Version documentaire:** 0.1 (inventaire exploratoire)  
**Statut:** document de travail pour l'accessibilité. **La séparation des langages est approuvée (D-98) ; les libellés de présentation ci-dessous restent des candidats tant qu'ils ne sont pas explicitement adoptés et évalués.**

## 1. Objet du document / Purpose

Ce glossaire documente les formulations **françaises et anglaises possibles pour les personnes utilisant une analyse**, en les reliant à des concepts de la **Méthode trialectique** et, lorsqu'ils existent, à des identifiants de la **formalisation informatique**. L'objectif est de rendre une analyse plus facile à comprendre sans altérer l'identité de ses Objets, ses données, ses qualifications, ni les conditions de validité de ses conclusions.

This glossary lists **possible French and English reader-facing terms**, aligned to Method concepts and, where available, technical exchange identifiers. A readable label is **not** a new data type, formal definition, or inference.

**Ne pas confondre trois vocabulaires / Three distinct vocabularies:**

1. **Conceptuel / Conceptual:** définition et portée des concepts de la Méthode, indépendamment du logiciel.
2. **Informatique / Technical:** identifiants, structures, règles de validation et échanges entre applications/IA ; la forme exacte dépend d'un contrat et de sa version.
3. **Interface humaine / Human-facing:** étiquettes, questions et explications en langage courant, contextualisées selon la langue, le public et l'opération.

Ce document **n'impose pas encore de libellés par défaut** et ne modifie aucun schéma. La correspondance français–anglais des termes de référence validés reste documentée dans [french-english-glossary.md](french-english-glossary.md). Les hypothèses de design figurent dans [RD-04](../research/interaction/human-and-technical-terminology.md). Les sources de définition et les contrats actuels sont [la Méthode](../reference/trialectic-method.md), [le catalogue des modèles](../reference/data-models.md) et les [schémas d'échange v2](../schemas/global-model.md).

## 2. Légende des statuts / Status legend

- **C — Concept établi / Established concept:** l'existence ou le sens du concept figure dans les décisions de la Méthode ; **cela ne valide pas chaque traduction d'interface**.
- **P — Proposition UI / Proposed UI wording:** une ou plusieurs formulations à comparer ; pas de vocabulaire obligatoire.
- **O — Ouvert / Open:** ambiguïté conceptuelle, typage, critère de relation, identité ou équivalence nécessitant un travail supplémentaire.
- **EXP — Expérimental / Experimental:** fonction graphique locale ou prototype, sans changement au modèle normatif.

Les lignes suivantes ont généralement le statut **C pour le référent conceptuel et P pour les libellés humains**. Les exceptions sont signalées. La validation d'une définition par l'auteur n'est pas une validation empirique de son intelligibilité.

## 3. Comprendre le périmètre / Understanding the scope

| Concept / rôle dans la Méthode | Ancrage informatique existant (si pertinent) | Possibilités FR pour l'analyste | Possible EN wording | Distinction à préserver |
| --- | --- | --- | --- | --- |
| Analysis / Analyse | `Analysis`, `analysis_id`, `schema_version` | Analyse ; étude d'une situation ; question examinée | Analysis; study of a situation; question under examination | Le document d'échange est une **représentation partielle** de l'analyse, pas toute la Méthode. |
| Object / Objet | `objects`, `Object.id` | Élément ; élément étudié ; objet ; personne, groupe ou système selon le contexte | Element; thing under study; object; person, group, or system | Un Objet n'est pas automatiquement le Sujet principal ; ses identifiants sont conservés. |
| Subject / Sujet (rôle analytique) | `main_subject`, `secondary_subjects` selon le rôle | Sujet étudié ; ce que nous examinons ; élément principal | Subject under study; what we are examining; main element | Le Sujet est un rôle d'attention attribué à un Objet ; ne pas en créer une catégorie technique distincte par simple étiquette. |
| Main Subject / Sujet principal | `main_subject` | Sujet principal ; point de départ de l'analyse | Main subject; starting point of the analysis | Distinguer des autres Sujets concernés. |
| Secondary Subject / Sujet secondaire | `secondary_subjects` | Autre personne ou élément concerné ; autre sujet à considérer | Other affected person or element; additional subject | « Secondaire » ne signifie pas que ses intérêts ou risques sont négligeables. |
| Environment / Environnement | `environment` | Contexte ; éléments autour du sujet ; environnement pertinent | Context; surrounding elements; relevant environment | Comprend des relations indirectes pertinentes ; ne se limite pas aux interactions accessibles. |
| Focus (attention analytique) | `focus` du profil Analysis ; `PowerEvaluation.Focus` dans un autre contrat | Point examiné ; question du moment ; ce que j'examine | Current focus; what I'm examining; question at hand | Plusieurs Focus **de portée différente** existent ; ne pas les confondre avec le Focus de navigation de trIA. **O** sur le libellé général. |
| Focus de navigation (trIA) | État de navigation de l'interface, non `PowerEvaluation.Focus` | Élément sélectionné ; ce que j'examine sur la carte | Selected item; what I'm exploring on the map | La sélection ne change ni l'analyse ni une évaluation. |
| Stage / Étape méthodologique | Opération conceptuelle ; pas de champ global universel `stage` requis par Analysis v2 | Étape ; question examinée ; opération d'analyse | Step; investigation; analytical operation | Ne pas identifier une Étape à une phase complète. |
| Comprendre → Explorer → Décider | Phases de la Méthode ; couverture partielle par les schémas v2 | Comprendre ; explorer les possibilités ; décider si nécessaire | Understand; explore possibilities; decide when needed | Les trois phases sont récursives ; une analyse peut s'arrêter avant la décision. |

## 4. NEED, CAN, Puissance, Pouvoir et Actualisation

| Concept / rôle dans la Méthode | Ancrage informatique existant (si pertinent) | Possibilités FR pour l'analyste | Possible EN wording | Distinction à préserver |
| --- | --- | --- | --- | --- |
| CAN / Potentiality / Potentialité | `concept_kind: "CAN"`, Objet référencé par une attribution contextuelle | **Potentialité** ; possibilité ; ce que cet élément pourrait faire ou permettre | **Potentiality**; possibility; what this element could do or enable | **Correspondance conceptuelle CAN = Potentialité établie.** Cela ne prouve ni autonomie, ni faisabilité immédiate, ni réussite. |
| NEED / nécessité attribuable | `concept_kind: "NEED"`, Objet et `Relation.attribution` | Besoin ; nécessité ; condition nécessaire à un état précis | Need; requirement; necessity for a specified state | « Besoin » et « condition nécessaire » ne sont **pas toujours synonymes** ; ne pas déduire une nécessité de la simple association. **P/O** pour le libellé. |
| Potency / Puissance | Ensemble des CANs d'un Objet ; pas un champ universel de premier niveau exigé par Analysis v2 | Puissance ; ensemble de ses potentialités ; possibilités dont dispose cet élément | Potency; set of potentialities; available potentialities | **Puissance ≠ Pouvoir**. Un inventaire de CANs n'implique pas leur actualisabilité actuelle. |
| Power / Pouvoir | `PowerEvaluation`, `power_assessments` pour les évaluations correspondantes | Pouvoir ; ce qui est effectivement envisageable dans ces conditions ; examen des possibilités | Power; what is possible under these conditions; assessment of possibilities | Le Pouvoir est une **opération comparative contextuelle**, pas simplement un verdict binaire de succès. |
| PowerEvaluation / Évaluation du Pouvoir | Contrat séparé `PowerEvaluation` : `ID`, `Subject`, `Focus`, `Context`, `Dependencies`, `Results` | Évaluation des possibilités et des conditions ; examiner ce qui est possible | Assessment of possibilities and conditions; examine what is possible | Ne pas réduire à un nombre ou à une garantie de succès ; conserver le contexte et les incertitudes. |
| Actionable CAN | Évaluation contextualisée de conditions d'action | Potentialité dont les conditions d'action sont réunies ; action envisageable maintenant (si le temps est pertinent) | Potentiality with action conditions met; currently actionable possibility (if time-scoped) | « Actionnable » n'établit pas à lui seul le Pouvoir complet pour une Actualisation plus large. |
| Conditions / Conditions | `conditions` ; résultats distincts dans `condition_assessments` | Conditions à réunir ; ce qui doit être vrai ; éléments à vérifier | Conditions to meet; what must hold; things to check | Distinguer **définition d'une condition** de **son état évalué** ; l'inconnu n'est pas le faux. |
| Condition assessment / Évaluation d'une condition | `condition_assessments` | Condition remplie, non remplie ou inconnue ; état de la condition | Met, unmet, or unknown condition; condition status | Ne pas fabriquer de preuve à partir de l'étiquette. |
| Pathway / Voie d'actualisation | `pathways`, `inventories` | Manière possible d'y parvenir ; voie ; conditions à réunir ensemble ou autrement | Possible route to achieve it; pathway; combination of requirements | Plusieurs chemins peuvent être alternatifs ; la composition logique doit rester inspectable. |
| Actualization / Actualisation | `events`, `effects` lorsque pertinents | Passage à l'action et effets ; mise en œuvre effective ; ce qui s'est réellement produit | Actualization; carrying something out and its effects; what actually happened | Un scénario ou une possibilité n'est **pas** une Actualisation observée. |
| Plasticity / Plasticité | Concept de la Méthode ; représentation informatique universelle non fixée | Faculté de développer, transformer ou perdre ses potentialités ; plasticité | Ability to gain, change, or lose potentialities; plasticity | La plasticité n'est pas identique au changement effectivement observé. |

## 5. Relations, preuves et scénarios / Relationships, evidence and scenarios

| Concept / rôle dans la Méthode | Ancrage informatique existant (si pertinent) | Possibilités FR pour l'analyste | Possible EN wording | Distinction à préserver |
| --- | --- | --- | --- | --- |
| Relation / Relation | `relations`, identifiants et versions propres | Lien ; relation ; comment ces éléments sont liés | Link; relationship; how these elements are connected | Un lien graphique n'est pas une preuve de causalité, de NEED ou de CAN. |
| Attribution NEED/CAN | `Relation.attribution` dans les profils concernés | Besoin attribué à cet élément ; potentialité de cet élément ; association à vérifier | Need attributed to this element; this element's potentiality; attribution to verify | Distinguer l'identité de l'Objet NEED/CAN de l'affirmation contextuelle de son attribution. |
| CAN affiliation: specialization / composition | `can_affiliations` en Analysis v2.2 | Potentialité plus précise ; potentialités réunies ; relation entre potentialités | More specific potentiality; combined potentialities; relation between potentialities | Spécialisation ou composition ne veut pas dire nécessité ou suffisance causale. |
| Definition / Définition d'un Objet | `definitions` avec versions et constituants | Description de l'élément ; ce qui le compose et le caractérise | Description of the element; what it consists of and how it is characterized | Une Définition contient plus que la liste des constituants ; préserver les versions. |
| Claim / Affirmation à examiner | `claims` | Affirmation ; proposition ; ce qui est avancé | Claim; statement; proposition under examination | Une affirmation enregistrée n'est pas une affirmation démontrée. |
| Evidence item / Élément de preuve | `evidence_items`, `evidence_reviews` | Source ; indice ; élément de preuve ; information à vérifier | Source; evidence item; supporting material; information to check | Une source n'est pas nécessairement une preuve suffisante ni indépendante. |
| Claim assessment / Évaluation d'une affirmation | `claim_assessments` | Ce qui soutient cette affirmation ; niveau de justification ; points incertains | How this claim is supported; assessment of the claim; remaining uncertainties | Statut du modèle et validité empirique restent distincts. |
| Inference / Inférence | Notion méthodologique validée ; ne pas inventer un champ obligatoire `inference` dans Analysis v2 | Raisonnement ; conclusion tirée de plusieurs éléments ; justification | Reasoning step; inference; conclusion drawn from premises | La justification d'une conclusion n'est pas la relation causale étudiée ; sa sérialisation générale reste ouverte. |
| Scenario / Scénario de résolution | `scenarios` | Scénario ; possibilité envisagée ; ce qui pourrait arriver | Scenario; possible course of events; what could happen | Séparer simulation, hypothèse, décision et effet effectivement observé. |
| Effect / Effet | `effects` | Effet possible ; conséquence ; changement observé selon le statut | Possible effect; consequence; observed change where supported | Distinguer anticipé, simulé, observé et causalement attribué ; direct/indirect et immédiat/différé. |
| Uncertainty / Incertitude | Qualifications selon les objets et évaluations concernés | Inconnu ; incertain ; hypothèse à vérifier | Unknown; uncertain; assumption to check | Ne pas convertir « non renseigné » en « inexistant ». |

## 6. Sémantique et représentations / Semantics and representations

| Concept / rôle dans la Méthode | Ancrage informatique existant (si pertinent) | Possibilités FR pour l'analyste | Possible EN wording | Distinction à préserver |
| --- | --- | --- | --- | --- |
| Semantic Object / Objet sémantique | Objet de la Méthode ; pas de nouvelle catégorie technique adoptée du fait du regroupement graphique | Objet sémantique ; unité de sens ; ensemble d'idées lorsque pertinent | Semantic Object; unit of meaning; meaningful unit; group of ideas where relevant | Identifié par Signification, Expression(s), Réseau conceptuel. Sa **fonction possible** de regroupement intelligible est approuvée, ses critères d'identité restent ouverts. |
| Semantic set / Ensemble sémantique (nom provisoire) | `semantic-groups.js` est une **abstraction de présentation EXP**, non un champ normatif | Ensemble de sens ; groupe d'éléments liés ; idée regroupée | Meaningful group; semantic set; related elements grouped together | Dessiner un ensemble ne crée pas automatiquement un Objet sémantique. |
| Meaning / Signification | Concept de la Méthode ; représentation à définir selon application | Ce que cela signifie ; idée résumée ; signification | Meaning; what it means; short statement of meaning | La phrase récapitulative peut être interprétative ; l'identité de Signification reste étudiée. |
| Expression / Expression | Concept de la Méthode | Manière d'exprimer une idée ; formulation | Wording; expression; how the idea is expressed | Différentes Expressions peuvent renvoyer à une Signification comparable. |
| Conceptual Network / Réseau conceptuel | Concept de la Méthode | Réseau d'idées liées ; relations entre idées | Network of connected ideas; conceptual network | Les relations conceptuelles ne deviennent pas automatiquement des NEEDs physiques ou fonctionnels. |
| Semantic Pyramid / Pyramide sémantique | Concept de la Méthode | Organisation des idées essentielles ; dépendances entre idées | Organization of essential ideas; conceptual dependencies | Le réseau n'est pas obligatoirement un arbre ; ce n'est pas un modèle universel de regroupement UI. |
| Semantic relation (hypothèse) | **O — aucun contrat universel adopté** | Lien de sens ; lien entre idées ; relation sémantique | Meaning-based link; semantic relationship; link between ideas | Distinguer lien sémantique, résumé graphique et NEED/CAN établi. |
| Map / Carte trIA | Projection graphique, non source de vérité | Carte ; vue d'ensemble ; représentation de l'analyse | Map; overview; visual representation | Une carte lisible ne démontre pas la justesse de l'analyse. |
| Collapsed set / Ensemble réduit | État UI expérimental | Ensemble résumé ; voir l'idée d'ensemble | Collapsed group; summarized group; see the big picture | Les membres et qualifications doivent rester accessibles. |
| Expanded set / Ensemble développé | État UI expérimental | Voir les éléments ; ouvrir le détail | Show elements; expand the group; see details | L'ouverture ne change pas les données de la Méthode. |
| Cross-set summary link / Lien résumé entre ensembles | Projection graphique locale expérimentale | Liens à examiner ; relations entre éléments de ces ensembles | Links to inspect; relationships between members of these groups | **Ne jamais afficher « ensemble A NEED ensemble B » sur la seule base d'un lien entre deux constituants.** |

## 7. Exemples d'interface à comparer / Candidate UI microcopy

| Situation | FR possible | EN possible |
| --- | --- | --- |
| Proposer un approfondissement | « Examiner ce qui empêche cette possibilité d'être mise en œuvre pourrait révéler des solutions. » | “Checking what prevents this possibility from being carried out could reveal alternatives.” |
| Afficher une inconnue | « Nous ne savons pas encore si cette condition est remplie. » | “We do not yet know whether this condition is met.” |
| Sélectionner un Focus de navigation | « Examiner cet élément » | “Explore this element” |
| Montrer un ensemble sémantique | « Cette idée résume plusieurs éléments. Ouvrir pour voir lesquels. » | “This idea summarizes several elements. Expand to see which ones.” |
| Prévenir d'une conclusion partielle | « Cette représentation ne montre pas tous les liens et risques possibles. » | “This view does not show every possible relationship or risk.” |
| Expliquer un effort supplémentaire | « Cette vérification pourrait changer notre compréhension de la situation ; voici ce qu'elle demande. » | “This check could change how we understand the situation; here is what it requires.” |

**Principes directeurs validés (D-98) :**

> Ne pas demander davantage d'effort à l'utilisateur avant de lui avoir rendu intelligible ce que cet effort pourrait lui apporter.

> Ne pas supprimer les efforts qui contribuent effectivement à développer sa compréhension et son autonomie.

These are interface/research principles, not an obligation to display long explanations at every click.

## 8. Règles de correspondance / Mapping rules

1. **Toujours partir du concept puis de l'identifiant technique existant, s'il y en a un.** Ne pas construire le modèle informatique en rétrotraduisant un libellé UI approximatif.
2. **Conserver la traçabilité :** l'interface doit permettre de retrouver l'identité, la version, la qualification, le contexte et les sources de l'enregistrement d'origine.
3. **Ne pas supposer de bijection :** un terme humain peut couvrir plusieurs concepts, et un concept peut demander plusieurs formulations selon le contexte. Désambiguïser avant la conversion inverse.
4. **Respecter les contrats :** les formes `objects`, `relations`, `concept_kind`, `power_assessments`, etc. ne sont citées que comme ancrages **des schémas d'échange actuels**. Elles ne sont pas des mots universellement obligatoires de toute implémentation future.
5. **Langue ≠ sémantique :** changer FR/EN ne change pas la signification, les faits ni le statut épistémique.
6. **Proposition UI ≠ validation conceptuelle :** des tests de compréhension et des décisions explicites seront nécessaires avant de choisir les libellés par défaut.
7. **Méthode ≠ formalisation ≠ application :** une décision sur la lisibilité de trIA ne change ni la Méthode ni un contrat de données générique.
8. **Éviter les libellés trompeurs :** privilégier une expression plus longue quand le terme courant masquerait une distinction nécessaire.

## 9. Évolution et propriété documentaire / Ownership

**Situation actuelle :** le document est rangé dans `terminology/` pour rester découvrable, sans décider encore de la future architecture. Le référentiel de la Méthode et [son glossaire bilingue](french-english-glossary.md) gardent l'autorité sur les concepts ; [les schémas](../schemas/README.md) restent l'autorité sur les contrats d'échange existants ; ce glossaire couvre uniquement des **possibilités de présentation**.

**Réorganisation à discuter :** distinguer un espace indépendant `method/` (concepts et recherche méthodologique), un espace `formalization/` (modèle informatique réutilisable, schémas, compatibilité/validation), et des `applications/` (interfaces et assistants). Le choix de cette architecture, les déplacements de fichiers et la gouvernance de leurs décisions **ne sont pas encore validés par ce document**.

**Étapes ultérieures :** confirmer les frontières de responsabilité, inventorier les dépendances réelles et les liens, décider des libellés pertinents FR/EN, puis éventuellement produire une table structurée utilisable par plusieurs interfaces (avec identifiants de concept, locale, contexte, statut, description et version), sans dupliquer les définitions dans des applications concurrentes.
