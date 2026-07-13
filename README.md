# Archives familiales Levy–Cerff

Collection documentaire numérique destinée à l'organisation, à la consultation et à la préservation des archives de la famille Levy–Cerff.

Cette application a été développée afin de centraliser des documents historiques provenant de plusieurs générations de la famille, notamment dans le cadre de recherches relatives à la nationalité française.

---

## Objectifs

Les Archives familiales Levy–Cerff ont pour vocation de :

- préserver les documents familiaux sous une forme numérique ;
- faciliter la consultation des actes et pièces d'archives ;
- visualiser les liens familiaux établis par les documents ;
- offrir un accès centralisé aux archives numérisées.

Cette application n'est **pas** un logiciel de généalogie. Les informations présentées sont exclusivement fondées sur les documents d'archives disponibles.

---

## Fonctionnalités

- Consultation des personnes présentes dans les archives
- Consultation des documents numérisés
- Arbre familial construit à partir des relations documentées
- Recherche parmi les personnes et les documents
- Prévisualisation des documents PDF
- Organisation des archives par type de document

---

## Types de documents

Les archives comprennent notamment :

- Actes de naissance
- Actes de mariage
- Actes de décès
- Livrets de famille
- Cartes d'immatriculation consulaire
- Passeports
- Certificats de nationalité
- Correspondance administrative
- Autres documents historiques

---

## Architecture

L'application est entièrement fondée sur trois ensembles de données :

- `people.json`
- `relationships.json`
- `documents.json`

Ces fichiers constituent la source unique des informations affichées.

Les vues de l'application sont générées automatiquement à partir de ces données.

---

## Technologies utilisées

- React
- TypeScript
- Vite
- React Router
- React Flow

---

## Licence

Cette collection documentaire est publiée à des fins de consultation et de recherche familiale.

Les documents reproduits peuvent être soumis aux droits applicables de leurs administrations d'origine ou de leurs détenteurs.

© Eugenia Levy