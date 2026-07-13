import { Link } from "react-router-dom";

import type { ArchiveDocument } from "../../types/Document";

import { getPerson } from "../../services/archive";

interface DocumentLinkProps {

    document: ArchiveDocument;

}

export default function DocumentLink({

    document,

}: DocumentLinkProps) {

    const referencedPeople =

        (document.referencedPeople ?? [])

            .map((reference) => getPerson(reference.person))

            .filter(

                (person): person is NonNullable<typeof person> =>

                    person !== undefined

            );

    return (

        <Link
            to={`/documents/${document.id}`}
            className="block rounded-xl border border-gray-200 bg-white p-4 transition hover:border-blue-500 hover:shadow"
        >

            <h3 className="text-lg font-semibold">

                {document.title}

            </h3>

            {referencedPeople.length > 0 && (

                <p className="mt-2 text-sm text-gray-600">

                    {referencedPeople

                        .map((person) => person.fullName)

                        .join(", ")}

                </p>

            )}

        </Link>

    );

}