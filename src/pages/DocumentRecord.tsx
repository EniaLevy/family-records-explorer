import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getAssetUrl } from "../utils/assets";

import Breadcrumbs from "../components/Navigation/Breadcrumbs";
import PDFViewer from "../components/Documents/PDFViewer";

import {
    getDocument,
    getPerson,
} from "../services/archive";

import { formatFrenchDate } from "../utils/date";
import { getDocumentTypeLabel } from "../utils/documentType";

function translateRole(role: string): string {

    const labels: Record<string, string> = {

        subject: "Sujet",
        holder: "Titulaire",

        father: "Père",
        mother: "Mère",

        grandfather: "Grand-père",
        grandmother: "Grand-mère",

        husband: "Époux",
        wife: "Épouse",

        child: "Enfant",

        deceased: "Décédé",

        father_of_husband: "Père de l'époux",
        mother_of_husband: "Mère de l'époux",

        father_of_wife: "Père de l'épouse",
        mother_of_wife: "Mère de l'épouse",

    };

    return labels[role] ?? role;

}

export default function DocumentRecord() {

    const { id } = useParams();

    const document = getDocument(id ?? "");

    const [selectedVersion, setSelectedVersion] = useState(0);

    if (!document) {

        return (

            <div>

                <h1 className="text-4xl font-bold">

                    Document introuvable

                </h1>

            </div>

        );

    }

    const version = document.versions[selectedVersion];

    const pdfAsset = version.assets.find(
        asset => asset.type === "pdf"
    );

    const imageAsset = version.assets.find(
        asset => asset.type === "image"
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
                        to: "/documents",
                    },
                    {
                        label: document.title,
                    },
                ]}
            />

            <header className="mb-10">

                <h1 className="mb-2 text-5xl font-bold">

                    {document.title}

                </h1>

                <p className="text-lg text-gray-500">

                    {getDocumentTypeLabel(document.documentType)}

                </p>

            </header>

            <div className="grid gap-8 lg:grid-cols-[420px_1fr]">

                <aside className="space-y-6">

                    <section className="rounded-2xl border bg-white p-6 shadow-sm">

                        <h2 className="mb-5 text-xl font-semibold">

                            Informations

                        </h2>

                        <div className="space-y-4 text-sm">

                            {document.creationDate && (

                                <div>

                                    <strong>Création</strong>

                                    <p>{formatFrenchDate(document.creationDate)}</p>

                                </div>

                            )}

                            {document.issueDate && (

                                <div>

                                    <strong>Délivrance</strong>

                                    <p>{formatFrenchDate(document.issueDate)}</p>

                                </div>

                            )}

                            {document.country && (

                                <div>

                                    <strong>Pays</strong>

                                    <p>{document.country}</p>

                                </div>

                            )}

                            {document.authority && (

                                <div>

                                    <strong>Autorité</strong>

                                    <p>{document.authority}</p>

                                </div>

                            )}

                            {document.source && (

                                <div>

                                    <strong>Source</strong>

                                    <p>{document.source}</p>

                                </div>

                            )}

                        </div>

                    </section>

                    <section className="rounded-2xl border bg-white p-6 shadow-sm">

                        <h2 className="mb-5 text-xl font-semibold">

                            Personnes mentionnées

                        </h2>

                        <div className="space-y-4">

                            {document.referencedPeople.map((reference) => {

                                const person = getPerson(reference.person);

                                if (!person) return null;

                                return (

                                    <div key={`${reference.person}-${reference.role}`}>

                                        <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">

                                            {translateRole(reference.role)}

                                        </div>

                                        <Link

                                            to={`/people/${person.id}`}

                                            className="block rounded-lg bg-slate-100 px-4 py-2 transition hover:bg-blue-100"

                                        >

                                            {person.fullName}

                                        </Link>

                                    </div>

                                );

                            })}

                        </div>

                    </section>

                    {document.versions.length > 1 && (

                        <section className="rounded-2xl border bg-white p-6 shadow-sm">

                            <h2 className="mb-4 text-xl font-semibold">

                                Versions

                            </h2>

                            <div className="space-y-2">

                                {document.versions.map((version, index) => (

                                    <button

                                        key={version.id}

                                        onClick={() => setSelectedVersion(index)}

                                        className={`w-full rounded-lg px-4 py-3 text-left transition ${

                                            index === selectedVersion

                                                ? "bg-blue-600 text-white"

                                                : "bg-slate-100 hover:bg-slate-200"

                                        }`}

                                    >

                                        <div>

                                            {version.label}

                                        </div>

                                        {version.description && (

                                            <div className="mt-1 text-sm opacity-80">

                                                {version.description}

                                            </div>

                                        )}

                                    </button>

                                ))}

                            </div>

                        </section>

                    )}

                </aside>

                <main className="rounded-2xl border bg-white p-6 shadow-sm">

                    {pdfAsset && (

                        <>

                            <div className="mb-4 flex gap-3">

                                <a

                                    href={getAssetUrl(pdfAsset.path)}

                                    target="_blank"

                                    rel="noopener noreferrer"

                                    className="rounded bg-slate-700 px-4 py-2 text-white hover:bg-slate-800"

                                >

                                    Ouvrir l'original

                                </a>

                                <a

                                    href={getAssetUrl(pdfAsset.path)}

                                    download

                                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"

                                >

                                    Télécharger

                                </a>

                            </div>

                            <PDFViewer file={getAssetUrl(pdfAsset.path)} />

                        </>

                    )}

                    {imageAsset && (

                        <img

                            src={getAssetUrl(imageAsset.path)}

                            alt={document.title}

                            className="mx-auto max-h-225 rounded-lg"

                        />

                    )}

                    {!pdfAsset && !imageAsset && (

                        <div className="py-20 text-center text-gray-500">

                            Aucun aperçu disponible.

                        </div>

                    )}

                </main>

            </div>

        </div>

    );

}