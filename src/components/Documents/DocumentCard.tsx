import { Link } from "react-router-dom";

import {
    FaCalendarAlt,
    FaFileAlt,
    FaGlobeEurope,
    FaUniversity,
    FaUsers,
} from "react-icons/fa";

import type { ArchiveDocument } from "../../types/Document";

import {
    getPerson,
} from "../../services/archive";

import {
    formatFrenchDate,
} from "../../utils/date";

interface DocumentCardProps {

    document: ArchiveDocument;

}

export default function DocumentCard({

    document,

}: DocumentCardProps) {

    const subjects = document.subjects
        .map(getPerson)
        .filter(Boolean);

    return (

        <Link
            to={`/documents/${document.id}`}
            className="group block rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
        >

            <div className="mb-6 flex items-start gap-4">

                <div className="rounded-xl bg-blue-100 p-4 text-2xl text-blue-600">

                    <FaFileAlt />

                </div>

                <div>

                    <h2 className="text-2xl font-semibold group-hover:text-blue-600">

                        {document.title}

                    </h2>

                </div>

            </div>

            <div className="space-y-5">

                <div>

                    <p className="mb-2 text-xs uppercase tracking-widest text-gray-500">

                        Sujet{subjects.length > 1 ? "s" : ""}

                    </p>

                    <div className="flex flex-wrap gap-2">

                        {subjects.map((person) => (

                            <span
                                key={person!.id}
                                className="rounded-full bg-slate-100 px-3 py-1 text-sm"
                            >

                                {person!.fullName}

                            </span>

                        ))}

                    </div>

                </div>

                {document.creationDate && (

                    <div className="flex items-center gap-3 text-gray-600">

                        <FaCalendarAlt />

                        <span>

                            Créé le{" "}
                            {formatFrenchDate(document.creationDate)}

                        </span>

                    </div>

                )}

                {document.issueDate && (

                    <div className="flex items-center gap-3 text-gray-600">

                        <FaCalendarAlt />

                        <span>

                            Délivré le{" "}
                            {formatFrenchDate(document.issueDate)}

                        </span>

                    </div>

                )}

                {document.country && (

                    <div className="flex items-center gap-3 text-gray-600">

                        <FaGlobeEurope />

                        <span>

                            {document.country}

                        </span>

                    </div>

                )}

                {document.authority && (

                    <div className="flex items-center gap-3 text-gray-600">

                        <FaUniversity />

                        <span>

                            {document.authority}

                        </span>

                    </div>

                )}

                {(document.referencedPeople?.length ?? 0) > 0 && (

                    <div className="flex items-center gap-3 text-gray-600">

                        <FaUsers />

                        <span>

                            {document.referencedPeople!.length} personne{document.referencedPeople!.length > 1 ? "s" : ""} mentionnée{document.referencedPeople!.length > 1 ? "s" : ""}

                        </span>

                    </div>

                )}

            </div>

        </Link>

    );

}