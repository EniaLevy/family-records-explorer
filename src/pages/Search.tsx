import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Breadcrumbs from "../components/Navigation/Breadcrumbs";
import PersonLink from "../components/Common/PersonLink";

import {
    searchPeople,
    searchDocumentsDetailed,
} from "../services/archive";

import {
    getDocumentTypeLabel,
} from "../utils/documentType";

function highlightMatch(
    text: string,
    query: string
) {

    if (!query.trim()) {

        return text;

    }

    const escaped = query.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
    );

    const parts = text.split(
        new RegExp(
            `(${escaped})`,
            "gi"
        )
    );

    return (

        <>

            {parts.map(

                (part, index) =>

                    part.toLowerCase() === query.toLowerCase()

                        ? (

                            <mark
                                key={index}
                                className="rounded bg-yellow-200 px-0.5"
                            >

                                {part}

                            </mark>

                        )

                        : (

                            <span key={index}>

                                {part}

                            </span>

                        )

            )}

        </>

    );

}

export default function Search() {

    const [query, setQuery] = useState("");

    const people = useMemo(
        () => searchPeople(query),
        [query]
    );

    const documents = useMemo(
        () => searchDocumentsDetailed(query),
        [query]
    );

    return (

        <div>

            <Breadcrumbs
                items={[
                    {
                        label: "Accueil",
                        to: "/",
                    },
                    {
                        label: "Recherche",
                    },
                ]}
            />

            <header className="mb-10">

                <h1 className="mb-3 text-5xl font-bold">

                    Recherche

                </h1>

                <p className="text-lg text-gray-600">

                    Rechercher une personne, un document ou une information contenue dans les archives.

                </p>

            </header>

            <input
                autoFocus
                value={query}
                onChange={(event) =>
                    setQuery(event.target.value)
                }
                placeholder="Nom, document..."
                className="mb-10 w-full rounded-2xl border border-gray-300 px-5 py-4 text-lg outline-none focus:border-blue-600"
            />

            {query.length === 0 && (

                <p className="text-gray-500">

                    Commencez à taper votre recherche.

                </p>

            )}

            {query.length > 0 && (

                <div className="space-y-14">

                    <section>

                        <h2 className="mb-5 text-3xl font-semibold">

                            Personnes ({people.length})

                        </h2>

                        <p className="mb-5 text-gray-600">

                            Les personnes de référence apparaissent également dans les résultats,
                            même lorsqu'elles ne disposent pas d'un dossier individuel.

                        </p>

                        <div className="space-y-3">

                            {people.length === 0 && (

                                <p className="text-gray-500">

                                    Aucun résultat.

                                </p>

                            )}

                            {people.map(person => (

                                <PersonLink
                                    key={person.id}
                                    person={person}
                                />

                            ))}

                        </div>

                    </section>

                    <section>

                        <h2 className="mb-5 text-3xl font-semibold">

                            Documents ({documents.length})

                        </h2>

                        <div className="space-y-5">

                            {documents.length === 0 && (

                                <p className="text-gray-500">

                                    Aucun résultat.

                                </p>

                            )}

                            {documents.map(result => (

                                <Link
                                    key={result.document.id}
                                    to={`/documents/${result.document.id}`}
                                    className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                                >

                                    <h3 className="text-xl font-semibold transition group-hover:text-blue-600">

                                        {highlightMatch(
                                            result.document.title,
                                            query
                                        )}

                                    </h3>

                                    <div className="mt-1 text-sm text-slate-500">

                                        {getDocumentTypeLabel(
                                            result.document.documentType
                                        )}

                                    </div>

                                    <div className="mt-5">

                                        <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">

                                            Éléments correspondants

                                        </div>

                                        <div className="space-y-2">

                                            {result.matches.map((match, index) => (

                                                <div
                                                    key={index}
                                                    className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700"
                                                >

                                                    {highlightMatch(
                                                        match.label,
                                                        query
                                                    )}

                                                </div>

                                            ))}

                                        </div>

                                    </div>

                                </Link>

                            ))}

                        </div>

                    </section>

                </div>

            )}

        </div>

    );

}