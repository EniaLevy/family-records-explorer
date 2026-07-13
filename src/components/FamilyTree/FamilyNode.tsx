import { Handle, Position } from "reactflow";

import {
    FaFileAlt,
    FaUser,
} from "react-icons/fa";

import {
    getDocumentsForPerson,
    getPerson,
} from "../../services/archive";

import { formatFrenchYear } from "../../utils/date";

interface FamilyNodeData {
    id: string;
    name: string;
    portrait?: string | null;
}

interface FamilyNodeProps {
    data: FamilyNodeData;
}

function getYears(personId: string): string {

    const person = getPerson(personId);

    if (!person) {
        return "";
    }

    const birth = formatFrenchYear(person.birthDate);
    const death = formatFrenchYear(person.deathDate);

    if (birth && death) {
        return `${birth} – ${death}`;
    }

    if (birth) {
        return `${birth} –`;
    }

    if (death) {
        return `† ${death}`;
    }

    return "";
}

function getNationalityStyle(
    nationality?: string | null
) {

    if (!nationality) {

        return {

            background: "bg-white",

            border: "border-slate-200",

            accent: "bg-slate-300",

        };

    }

    const lower = nationality.toLowerCase();

    const isFrench =
        lower.includes("français") ||
        lower.includes("française");

    const isMixed =
        isFrench &&
        nationality.includes("/");

    if (isMixed) {

        return {

            background: "bg-amber-50",

            border: "border-amber-300",

            accent: "bg-amber-400",

        };

    }

    if (isFrench) {

        return {

            background: "bg-blue-50",

            border: "border-blue-300",

            accent: "bg-blue-500",

        };

    }

    return {

        background: "bg-white",

        border: "border-slate-200",

        accent: "bg-slate-300",

    };

}

export default function FamilyNode({
    data,
}: FamilyNodeProps) {

    const person = getPerson(data.id);

    const documentCount =
        getDocumentsForPerson(data.id).length;

    const style =
        getNationalityStyle(
            person?.nationality
        );

    return (

        <>

            <Handle
                type="target"
                position={Position.Top}
                style={{ opacity: 0 }}
            />

            <div

                className={`nodrag nopan cursor-pointer w-60 overflow-hidden rounded-3xl border shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${style.background} ${style.border}`}

            >

                <div className={`h-2 w-full ${style.accent}`} />

                <div className="p-5">

                    <div className="flex flex-col items-center">

                        {

                            person?.portrait ? (

                                <img

                                    src={person.portrait}

                                    alt={person.fullName}

                                    draggable={false}

                                    className="mb-4 h-24 w-24 rounded-full border-4 border-white object-cover shadow-sm"

                                />

                            ) : (

                                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-slate-200 text-4xl text-slate-500">

                                    <FaUser />

                                </div>

                            )

                        }

                        <h2 className="text-center text-lg font-semibold leading-snug">

                            {person?.fullName ?? data.name}

                        </h2>

                        {

                            getYears(data.id) && (

                                <p className="mt-1 text-sm text-slate-500">

                                    {getYears(data.id)}

                                </p>

                            )

                        }

                        {

                            person?.nationality && (

                                <p className="mt-2 text-sm text-slate-500">

                                    {person.nationality}

                                </p>

                            )

                        }

                        <div className="mt-5 flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm text-slate-700">

                            <FaFileAlt />

                            <span>

                                {documentCount} {documentCount !== 1 ? "documents" : "document"}

                            </span>

                        </div>

                    </div>

                </div>

            </div>

            <Handle
                type="source"
                position={Position.Bottom}
                style={{ opacity: 0 }}
            />

        </>

    );

}