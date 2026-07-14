import { Link } from "react-router-dom";
import {
    FaCalendarAlt,
    FaFileAlt,
    FaUsers,
} from "react-icons/fa";

import { getPersonDisplay } from "../../services/personDisplay";
import { formatFrenchDate } from "../../utils/date";

import type { ArchiveDocument } from "../../types/Document";

interface DocumentListItemProps {

    document: ArchiveDocument;

}

export default function DocumentListItem({

    document,

}: DocumentListItemProps) {

    const subjects = document.subjects.map(subject =>

        getPersonDisplay(

            subject.person,

            subject.name

        )

    );

    const referencedCount =
        document.referencedPeople?.length ?? 0;

    return (

        <Link
            to={`/documents/${document.id}`}
            className="block rounded-xl border border-gray-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-md"
        >

            <div className="flex items-start gap-4">

                <div className="mt-1 rounded-lg bg-blue-100 p-3 text-blue-600">

                    <FaFileAlt />

                </div>

                <div className="flex-1">

                    <h3 className="text-lg font-semibold">

                        {document.title}

                    </h3>

                    <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-600">

                        {document.creationDate && (

                            <div className="flex items-center gap-2">

                                <FaCalendarAlt />

                                <span>

                                    {formatFrenchDate(
                                        document.creationDate
                                    )}

                                </span>

                            </div>

                        )}

                        <div className="flex items-center gap-2">

                            <FaUsers />

                            <span>

                                {document.subjects.length} sujet{document.subjects.length > 1 ? "s" : ""}

                            </span>

                        </div>

                        <div>

                            {referencedCount} personne{referencedCount > 1 ? "s" : ""} mentionnée{referencedCount > 1 ? "s" : ""}

                        </div>

                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">

                        {subjects.map((subject, index) => (

                            <span
                                key={`${document.id}-subject-${index}`}
                                className="rounded-full bg-slate-100 px-3 py-1 text-sm"
                            >

                                {subject.displayName}

                            </span>

                        ))}

                    </div>

                </div>

            </div>

        </Link>

    );

}