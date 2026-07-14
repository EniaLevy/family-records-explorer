import { Link } from "react-router-dom";

import ReferenceOnlyBadge from "./ReferenceOnlyBadge";

import type { Person } from "../../types/Person";

import { getAssetUrl } from "../../utils/assets";

import Portrait from "./Portrait";

interface PersonLinkProps {

    person: Person;

    subtitle?: string;

}

export default function PersonLink({

    person,

    subtitle,

}: PersonLinkProps) {

    const content = (

        <>

            <Portrait

                src={getAssetUrl(person.portrait)}

                alt={person.fullName}

                size="sm"

            />

            <div className="min-w-0 flex-1">

                <div className="flex flex-wrap items-center gap-2">

                    <p

                        className={`font-medium break-words ${
                            person.isReferenceOnly
                                ? "text-slate-700"
                                : ""
                        }`}

                    >

                        {person.fullName}

                    </p>

                    {
                        person.isReferenceOnly && (

                            <ReferenceOnlyBadge compact />

                        )
                    }

                </div>

                {

                    subtitle && (

                        <p className="mt-1 text-sm text-gray-500">

                            {subtitle}

                        </p>

                    )

                }

            </div>

        </>

    );

    if (person.isReferenceOnly) {

        return (

            <div

                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3"

            >

                {content}

            </div>

        );

    }

    return (

        <Link

            to={`/people/${person.id}`}

            className="flex items-center gap-4 rounded-xl border border-gray-200 p-3 transition hover:bg-gray-50 hover:border-blue-300"

        >

            {content}

        </Link>

    );

}