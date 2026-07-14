import { Handle, Position } from "reactflow";

import {
    FaFileAlt,
    FaUser,
} from "react-icons/fa";

import { getAssetUrl } from "../../utils/assets";

import {
    getDocumentsForPerson,
} from "../../services/archive";

import { formatFrenchYear } from "../../utils/date";

import type { Person } from "../../types/Person";

import ReferenceOnlyBadge from "../Common/ReferenceOnlyBadge";

interface FamilyNodeData {

    person: Person;

}

interface FamilyNodeProps {

    data: FamilyNodeData;

}

function getYears(person: Person): string {

    const birth = formatFrenchYear(

        person.birthDate

    );

    const death = formatFrenchYear(

        person.deathDate

    );

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

    person: Person

) {

    if (person.isReferenceOnly) {

        return {

            background: "bg-slate-50",

            border: "border-slate-300 border-dashed",

            accent: "bg-slate-400",

        };

    }

    if (!person.nationality) {

        return {

            background: "bg-white",

            border: "border-slate-200",

            accent: "bg-slate-300",

        };

    }

    const lower =

        person.nationality.toLowerCase();

    const isFrench =

        lower.includes("français") ||

        lower.includes("française");

    const isMixed =

        isFrench &&

        person.nationality.includes("/");

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

    const person = data.person;

    const years = getYears(person);

    const style =

        getNationalityStyle(person);

    const documentCount =

        getDocumentsForPerson(

            person.id

        ).length;

    return (

        <>

            <Handle

                type="target"

                position={Position.Top}

                style={{ opacity: 0 }}

            />

            <div

                className={`nodrag nopan w-60 overflow-hidden rounded-3xl border shadow-sm transition-all duration-200 ${

                    person.isReferenceOnly

                        ? ""

                        : "cursor-pointer hover:-translate-y-1 hover:shadow-xl"

                } ${style.background} ${style.border}`}

            >

                <div

                    className={`h-2 w-full ${style.accent}`}

                />

                <div className="p-5">

                    <div className="flex flex-col items-center">

                        {

                            person.portrait ? (

                                <img

                                    src={getAssetUrl(

                                        person.portrait

                                    )}

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

                        <h2 className="text-center text-lg font-semibold leading-tight break-words">

                            {person.fullName}

                        </h2>

                        {

                            person.isReferenceOnly && (

                                <div className="mt-3">

                                    <ReferenceOnlyBadge compact />

                                </div>

                            )

                        }

                        {

                            years && (

                                <p className="mt-2 text-sm text-slate-500">

                                    {years}

                                </p>

                            )

                        }

                        {

                            person.nationality &&

                            !person.isReferenceOnly && (

                                <p className="mt-2 max-w-full break-words text-center text-sm text-slate-500">

                                    {person.nationality}

                                </p>

                            )

                        }

                        <div className="mt-5 flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm text-slate-700">

                            <FaFileAlt />

                            <span>

                                {documentCount}{" "}

                                {

                                    documentCount === 1

                                        ? "document"

                                        : "documents"

                                }

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