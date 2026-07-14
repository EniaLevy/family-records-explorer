import { getPerson } from "./archive";

export interface PersonDisplay {

    person?: ReturnType<typeof getPerson>;

    displayName: string;

    exists: boolean;

    isReferenceOnly: boolean;

    hasPersonPage: boolean;

}

export function getPersonDisplay(

    personId?: string,

    fallbackName?: string

): PersonDisplay {

    const person = personId

        ? getPerson(personId)

        : undefined;

    if (person) {

        return {

            person,

            displayName: person.fullName,

            exists: true,

            isReferenceOnly: person.isReferenceOnly,

            hasPersonPage: !person.isReferenceOnly,

        };

    }

    return {

        person: undefined,

        displayName: fallbackName ?? "Inconnu",

        exists: false,

        isReferenceOnly: false,

        hasPersonPage: false,

    };

}