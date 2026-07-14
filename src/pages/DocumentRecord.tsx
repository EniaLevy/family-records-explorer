import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PersonReference from "../components/Common/PersonReference";
import { FaExternalLinkAlt } from "react-icons/fa";

import { getAssetUrl } from "../utils/assets";

import Breadcrumbs from "../components/Navigation/Breadcrumbs";
import PDFViewer from "../components/Documents/PDFViewer";

import {
    getDocument,
} from "../services/archive";

import {
    getPersonDisplay,
} from "../services/personDisplay";

import { formatFrenchDate } from "../utils/date";
import { getDocumentTypeLabel } from "../utils/documentType";

import { translateRole } from "../utils/documentRoles";

export default function DocumentRecord() {

    const { id } = useParams();

    useEffect(() => {

        window.scrollTo(0, 0);

    }, [id]);

    const document = getDocument(id ?? "");

    const [selectedVersion, setSelectedVersion] = useState(0);

    if (!document) {

        return (

            <div>

                <h1 className="text-4xl md:text-5xl font-bold">

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

            <header className="mb-8 md:mb-10">

                <h1 className="mb-2 break-words text-4xl md:text-5xl font-bold">

                    {document.title}

                </h1>

                <p className="text-base md:text-lg text-gray-500">

                    {getDocumentTypeLabel(document.documentType)}

                </p>

            </header>

            <div className="space-y-8">

                <div className="grid gap-8 lg:grid-cols-2">

                    <section className="rounded-2xl border bg-white p-5 md:p-6 shadow-sm">

                        <h2 className="mb-5 text-lg md:text-xl font-semibold">

                            Informations

                        </h2>

                        <div className="grid gap-6 text-sm">

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

                                    <div className="mt-1">

                                        {document.source.url ? (

                                            <a

                                                href={document.source.url}

                                                target="_blank"

                                                rel="noopener noreferrer"

                                                className="inline-flex items-center gap-2 break-words text-blue-600 transition hover:text-blue-700 hover:underline"

                                            >

                                                {document.source.label}

                                                <FaExternalLinkAlt className="text-xs opacity-75" />

                                            </a>

                                        ) : (

                                            <p className="break-words">

                                                {document.source.label}

                                            </p>

                                        )}

                                        {document.source.archiveReference && (

                                            <p className="mt-2 font-mono text-xs text-slate-500">

                                                {document.source.archiveReference}

                                            </p>

                                        )}

                                    </div>

                                </div>

                            )}
                        </div>

                    </section>

                    <section className="rounded-2xl border bg-white p-5 md:p-6 shadow-sm">

                        <h2 className="mb-5 text-lg md:text-xl font-semibold">

                            Personnes mentionnées

                        </h2>

                        <div className="space-y-3">

                            {document.referencedPeople.map((reference) => {

                                const display = getPersonDisplay(

                                    reference.person,

                                    reference.name

                                );

                                return (

                                    <PersonReference

                                        key={`${reference.role}-${reference.person ?? reference.name}`}

                                        person={display}

                                        role={translateRole(reference.role)}

                                    />

                                );

                            })}

                        </div>

                    </section>

                </div>

                {document.versions.length > 1 && (

                    <section className="rounded-2xl border bg-white p-5 md:p-6 shadow-sm">

                        <h2 className="mb-4 text-lg md:text-xl font-semibold">

                            Versions

                        </h2>

                        <div className="flex flex-wrap gap-3">

                            {document.versions.map((version, index) => (

                                <button

                                    key={version.id}

                                    onClick={() => setSelectedVersion(index)}

                                    className={`rounded-lg px-4 py-3 text-left transition ${
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

                <section className="rounded-2xl border bg-white p-4 md:p-6 shadow-sm">

                    {pdfAsset && (

                        <PDFViewer

                            file={getAssetUrl(pdfAsset.path)}

                            originalUrl={getAssetUrl(pdfAsset.path)}

                        />

                    )}

                    {imageAsset && (

                        <img

                            src={getAssetUrl(imageAsset.path)}

                            alt={document.title}

                            className="mx-auto w-full rounded-lg"

                        />

                    )}

                    {!pdfAsset && !imageAsset && (

                        <div className="py-20 text-center text-gray-500">

                            Aucun aperçu disponible.

                        </div>

                    )}

                </section>

            </div>

        </div>

    );

}