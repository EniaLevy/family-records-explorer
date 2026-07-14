import Breadcrumbs from "../components/Navigation/Breadcrumbs";
import DocumentCard from "../components/Documents/DocumentCard";

import { getDocuments } from "../services/archive";

import {
    getDocumentTypeLabel,
} from "../utils/documentType";

export default function Documents() {

    const documents = getDocuments();

    const groupedDocuments = documents.reduce(

        (groups, document) => {

            if (!groups[document.documentType]) {

                groups[document.documentType] = [];

            }

            groups[document.documentType].push(document);

            return groups;

        },

        {} as Record<string, typeof documents>

    );

    const categories = Object.keys(groupedDocuments).sort(

        (a, b) =>

            getDocumentTypeLabel(a).localeCompare(

                getDocumentTypeLabel(b),

                "fr",

                {

                    sensitivity: "base",

                }

            )

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

                        label: "Documents",

                    },

                ]}

            />

            <header className="mb-12">

                <h1 className="mb-3 text-5xl font-bold">

                    Documents

                </h1>

                <p className="text-xl text-gray-600">

                    Parcourez tous les documents de l'archive familiale.

                </p>

            </header>

            <div className="space-y-16">

                {

                    categories.map(category => (

                        <section

                            key={category}

                        >

                            <h2 className="mb-6 border-b border-slate-200 pb-3 text-3xl font-semibold">

                                {

                                    getDocumentTypeLabel(

                                        category

                                    )

                                }

                            </h2>

                            <div className="grid gap-8 lg:grid-cols-2">

                                {

                                    [...groupedDocuments[category]]

                                        .sort((a, b) =>

                                            a.title.localeCompare(

                                                b.title,

                                                "fr",

                                                {

                                                    sensitivity: "base",

                                                }

                                            )

                                        )

                                        .map(document => (

                                            <DocumentCard

                                                key={document.id}

                                                document={document}

                                            />

                                        ))

                                }

                            </div>

                        </section>

                    ))

                }

            </div>

        </div>

    );

}