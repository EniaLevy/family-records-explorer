import type { ArchiveDocument } from "../types/Document";

import type {
    Relationship,
} from "../types/Relationship";

function findPerson(
    document: ArchiveDocument,
    ...roles: string[]
): string | undefined {

    return document.referencedPeople.find(

        person => roles.includes(person.role)

    )?.person;

}

export function buildRelationships(
    documents: ArchiveDocument[]
): Relationship[] {

    const relationships: Relationship[] = [];

    const seen = new Set<string>();

    function addRelationship(
        relationship: Relationship
    ) {

        let key: string;

        if (relationship.type === "marriage") {

            const ids = [

                relationship.husband,

                relationship.wife,

            ].sort();

            key = `marriage:${ids[0]}:${ids[1]}`;

        }

        else {

            key =
                `parent:${relationship.parent}:${relationship.parentRole}:${relationship.child}`;

        }

        if (

            !seen.has(key)

        ) {

            seen.add(key);

            relationships.push(relationship);

        }

    }

    function extractMarriage(
        document: ArchiveDocument
    ) {

        let husband =
            findPerson(document, "husband");

        let wife =
            findPerson(document, "wife");

        if (

            !husband ||

            !wife

        ) {

            const deceased =
                findPerson(document, "deceased");

            const spouse =
                findPerson(document, "spouse");

            if (

                deceased &&
                spouse

            ) {

                husband = deceased;

                wife = spouse;

            }

        }

        if (

            !husband ||

            !wife

        ) {

            return;

        }

        addRelationship({

            type: "marriage",

            husband,

            wife,

        });

    }

    function extractParentChild(
        document: ArchiveDocument
    ) {

        const subject =
            findPerson(document, "subject")
            ?? document.subjects[0]?.person;

        const husband =
            findPerson(document, "husband");

        const wife =
            findPerson(document, "wife");

        const deceased =
            findPerson(document, "deceased");

        const roleTargets: Record<string, string | undefined> = {

            father: subject ?? deceased,

            mother: subject ?? deceased,

            father_of_husband: husband,

            mother_of_husband: husband,

            father_of_wife: wife,

            mother_of_wife: wife,

            paternal_grandfather:
                findPerson(document, "father"),

            paternal_grandmother:
                findPerson(document, "father"),

            maternal_grandfather:
                findPerson(document, "mother"),

            maternal_grandmother:
                findPerson(document, "mother"),

        };

        for (

            const reference

            of document.referencedPeople

        ) {

            const child =
                roleTargets[reference.role];

            if (!child) {

                continue;

            }

            const isFatherRole =

                reference.role.includes(

                    "father"

                );

            addRelationship({

                type: "parent-child",

                parent:
                    reference.person,

                parentRole:

                    isFatherRole

                        ? "father"

                        : "mother",

                child,

            });

        }

        const children =

            document.referencedPeople.filter(

                person =>

                    person.role === "child"

            );

        for (

            const child

            of children

        ) {

            if (

                husband

            ) {

                addRelationship({

                    type: "parent-child",

                    parent: husband,

                    parentRole: "father",

                    child: child.person,

                });

            }

            if (

                wife

            ) {

                addRelationship({

                    type: "parent-child",

                    parent: wife,

                    parentRole: "mother",

                    child: child.person,

                });

            }

        }

    }

    for (

        const document

        of documents

    ) {

        extractMarriage(

            document

        );

        extractParentChild(

            document

        );

    }

    return relationships;

}