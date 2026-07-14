import { Link } from "react-router-dom";

import type { ArchiveDocument } from "../../types/Document";

import {
    getPersonDisplay,
} from "../../services/personDisplay";

interface DocumentLinkProps {

    document: ArchiveDocument;

}

export default function DocumentLink({

    document,

}: DocumentLinkProps) {

    const referencedPeople =

        (document.referencedPeople ?? [])

            .map(reference =>

                getPersonDisplay(

                    reference.person,

                    reference.name

                )

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

                        .map(person => person.displayName)

                        .join(", ")}

                </p>

            )}

        </Link>

    );

}