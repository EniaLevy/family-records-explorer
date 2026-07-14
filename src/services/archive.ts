import people from "../data/people.json";
import documents from "../data/documents.json";
import { buildRelationships } from "./buildRelationships";

import type { Person } from "../types/Person";
import type {
    ArchiveDocument,
} from "../types/Document";

import { getPersonDisplay } from "./personDisplay";
import { translateRole } from "../utils/documentRoles";

import type {
    ParentChildRelationship,
    MarriageRelationship,
} from "../types/Relationship";

const peopleData = people as Person[];

const documentData =
    documents as unknown as ArchiveDocument[];

const relationshipData =
    buildRelationships(documentData);

function contains(
    value: string | null | undefined,
    query: string
): boolean {

    if (!value) {

        return false;

    }

    return value
        .toLowerCase()
        .includes(query.toLowerCase());

}

export function getPeople(): Person[] {

    return peopleData;

}

export function getPerson(
    id: string
): Person | undefined {

    return peopleData.find(

        person => person.id === id

    );

}

export function hasPersonPage(
    personId: string
): boolean {

    const person = getPerson(personId);

    return !!person && !person.isReferenceOnly;

}

export function isReferenceOnly(
    personId: string
): boolean {

    return !hasPersonPage(personId);

}

export function getDocuments(): ArchiveDocument[] {

    return documentData;

}

export function getDocument(
    id: string
): ArchiveDocument | undefined {

    return documentData.find(

        document => document.id === id

    );

}

export function getDocumentsForPerson(
    personId: string
): ArchiveDocument[] {

    return documentData.filter(

        document =>

            document.subjects.some(

                subject =>

                    subject.person === personId

            )

    );

}

export function getReferencedDocuments(
    personId: string
): ArchiveDocument[] {

    return documentData.filter(

        document =>

            document.referencedPeople.some(

                person => person.person === personId

            )

    );

}

export function getDocumentCount(
    personId: string
): number {

    return getDocumentsForPerson(personId).length;

}

export function getRelationships() {

    return relationshipData;

}

export function getFather(
    personId: string
): Person | undefined {

    const relation = relationshipData.find(
        (
            relationship
        ): relationship is ParentChildRelationship =>

            relationship.type === "parent-child" &&
            relationship.child === personId &&
            relationship.parentRole === "father"
    );

    return relation

        ? getPerson(relation.parent)

        : undefined;

}

export function getMother(
    personId: string
): Person | undefined {

    const relation = relationshipData.find(
        (
            relationship
        ): relationship is ParentChildRelationship =>

            relationship.type === "parent-child" &&
            relationship.child === personId &&
            relationship.parentRole === "mother"
    );

    return relation

        ? getPerson(relation.parent)

        : undefined;

}

export function getChildren(
    personId: string
): Person[] {

    return relationshipData

        .filter(

            (
                relationship
            ): relationship is ParentChildRelationship =>

                relationship.type === "parent-child" &&

                relationship.parent === personId

        )

        .map(

            relationship =>

                getPerson(

                    relationship.child

                )

        )

        .filter(

            (person): person is Person =>

                person !== undefined

        );

}

export function getSpouses(
    personId: string
): Person[] {

    return relationshipData

        .filter(

            (
                relationship
            ): relationship is MarriageRelationship =>

                relationship.type === "marriage" &&

                (
                    relationship.husband === personId ||

                    relationship.wife === personId
                )

        )

        .map(

            relationship =>

                getPerson(

                    relationship.husband === personId

                        ? relationship.wife

                        : relationship.husband

                )

        )

        .filter(

            (person): person is Person =>

                person !== undefined

        );

}

export function searchPeople(
    query: string
): Person[] {

    if (!query.trim()) {

        return [];

    }

    return peopleData.filter(

        person =>

            contains(

                person.fullName,

                query

            )

    );

}

export interface DocumentSearchMatch {

    type:
        | "subject"
        | "reference"
        | "country"
        | "authority";

    label: string;

    personId?: string;

    role?: string;

}

function pushMatch(

    matches: DocumentSearchMatch[],

    type: DocumentSearchMatch["type"],

    label: string,

    personId?: string,

    role?: string

) {

    const normalizedRole =
        role === "subject" ? "subject" : role;

    const duplicate = matches.some(match => {

        if (
            personId &&
            match.personId
        ) {

            return (
                match.personId === personId &&
                (match.role === "subject"
                    ? "subject"
                    : match.role) === normalizedRole
            );

        }

        return (
            match.type === type &&
            match.label === label
        );

    });

    if (!duplicate) {

        matches.push({

            type,

            label,

            personId,

            role,

        });

    }

}

const matchPriority: Record<string, number> = {

    "Sujet": 0,
    "Titulaire": 1,

    "Père": 2,
    "Mère": 3,

    "Époux": 4,
    "Épouse": 5,

    "Enfant": 6,

    "Grand-père": 7,
    "Grand-mère": 8,

    "Témoin": 9,

    "Décédé": 10,

    "Titre": 20,

    "Autorité": 30,

    "Pays": 40,

};

function getMatchPriority(

    match: DocumentSearchMatch

): number {

    const prefix =

        match.label.split(" • ")[0];

    return matchPriority[prefix] ?? 100;

}
export interface DocumentSearchResult {

    document: ArchiveDocument;

    matches: DocumentSearchMatch[];

}

export function searchDocuments(
    query: string
): ArchiveDocument[] {

    if (!query.trim()) {

        return [];

    }

    return documentData.filter(document => {

        if (

            contains(document.title, query) ||

            contains(document.documentType, query) ||

            contains(document.country, query) ||

            contains(document.authority, query)

        ) {

            return true;

        }

        if (

            document.subjects.some(subject => {

                const display = getPersonDisplay(

                    subject.person,

                    subject.name

                );

                return contains(

                    display.displayName,

                    query

                );

            })

        ) {

            return true;

        }

        if (

            document.referencedPeople.some(reference => {

                const display = getPersonDisplay(

                    reference.person,

                    reference.name

                );

                return contains(

                    display.displayName,

                    query

                );

            })

        ) {

            return true;

        }

        return false;

    });

}

export function searchDocumentsDetailed(

    query: string

): DocumentSearchResult[] {

    if (!query.trim()) {

        return [];

    }

    return documentData.flatMap(document => {

        const matches: DocumentSearchMatch[] = [];

        if (

            contains(

                document.country,

                query

            )

        ) {

            pushMatch(

                matches,

                "country",

                `Pays • ${document.country}`

            );

        }

        if (

            contains(

                document.authority,

                query

            )

        ) {

            pushMatch(

                matches,

                "authority",

                `Autorité • ${document.authority}`

            );

        }

        document.subjects.forEach(subject => {

            const display =

                getPersonDisplay(

                    subject.person,

                    subject.name

                );

            if (

                contains(

                    display.displayName,

                    query

                )

            ) {

                pushMatch(

                    matches,

                    "subject",

                    `Sujet • ${display.displayName}`,

                    subject.person,

                    "subject"

                );

            }

        });

        document.referencedPeople.forEach(reference => {

            const display =

                getPersonDisplay(

                    reference.person,

                    reference.name

                );

            if (

                contains(

                    display.displayName,

                    query

                )

            ) {

                pushMatch(

                    matches,

                    "reference",

                    `${translateRole(reference.role)} • ${display.displayName}`,

                    reference.person,

                    reference.role

                );

            }

        });

        matches.sort(

            (a, b) =>

                getMatchPriority(a) -

                getMatchPriority(b)

        );

        return matches.length > 0

            ? [{

                document,

                matches,

            }]

            : [];

    });

}

export function getFatherRelationship(
    personId: string
): ParentChildRelationship | undefined {

    return relationshipData.find(
        (
            relationship
        ): relationship is ParentChildRelationship =>

            relationship.type === "parent-child" &&
            relationship.child === personId &&
            relationship.parentRole === "father"

    );

}

export function getMotherRelationship(
    personId: string
): ParentChildRelationship | undefined {

    return relationshipData.find(
        (
            relationship
        ): relationship is ParentChildRelationship =>

            relationship.type === "parent-child" &&
            relationship.child === personId &&
            relationship.parentRole === "mother"

    );

}

export function getChildrenRelationships(
    personId: string
): ParentChildRelationship[] {

    return relationshipData.filter(

        (
            relationship
        ): relationship is ParentChildRelationship =>

            relationship.type === "parent-child" &&
            relationship.parent === personId

    );

}

export function getMarriageRelationships(
    personId: string
): MarriageRelationship[] {

    return relationshipData.filter(

        (
            relationship
        ): relationship is MarriageRelationship =>

            relationship.type === "marriage" &&
            (
                relationship.husband === personId ||
                relationship.wife === personId
            )

    );

}