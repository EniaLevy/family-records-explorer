import people from "../data/people.json";
import documents from "../data/documents.json";
import relationships from "../data/relationships.json";

import type { Person } from "../types/Person";
import type {
    ArchiveDocument,
} from "../types/Document";

import type {
    Relationship,
    ParentChildRelationship,
    MarriageRelationship,
} from "../types/Relationship";

const peopleData = people as Person[];

const documentData =
    documents as unknown as ArchiveDocument[];

const relationshipData =
    relationships as unknown as Relationship[];

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

            document.subjects.includes(personId)

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

export function searchDocuments(
    query: string
): ArchiveDocument[] {

    if (!query.trim()) {

        return [];

    }

    return documentData.filter(

        document =>

            contains(document.title, query) ||

            contains(document.documentType, query) ||

            contains(document.country, query) ||

            contains(document.authority, query)

    );

}