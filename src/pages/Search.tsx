import { useMemo, useState } from "react";

import Breadcrumbs from "../components/Navigation/Breadcrumbs";
import PersonLink from "../components/Common/PersonLink";
import DocumentLink from "../components/Common/DocumentLink";

import {
    searchPeople,
    searchDocuments,
} from "../services/archive";

export default function Search() {

    const [query, setQuery] = useState("");

    const people = useMemo(
        () => searchPeople(query),
        [query]
    );

    const documents = useMemo(
        () => searchDocuments(query),
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

                        <div className="space-y-3">

                            {people.length === 0 && (

                                <p className="text-gray-500">

                                    Aucun résultat.

                                </p>

                            )}

                            {people.map((person) => (

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

                        <div className="space-y-3">

                            {documents.length === 0 && (

                                <p className="text-gray-500">

                                    Aucun résultat.

                                </p>

                            )}

                            {documents.map((document) => (

                                <DocumentLink
                                    key={document.id}
                                    document={document}
                                />

                            ))}

                        </div>

                    </section>

                </div>

            )}

        </div>

    );

}