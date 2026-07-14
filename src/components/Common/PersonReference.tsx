import { Link } from "react-router-dom";

import type { PersonDisplay } from "../../services/personDisplay";

import ReferenceOnlyBadge from "./ReferenceOnlyBadge";

interface PersonReferenceProps {

    person: PersonDisplay;

    role?: string;

    className?: string;

}

export default function PersonReference({

    person,

    role,

    className = "",

}: PersonReferenceProps) {

    const content = (

        <>

            {

                role && (

                    <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">

                        {role}

                    </div>

                )

            }

            <div className="flex flex-wrap items-center justify-between gap-3">

                <span className="break-words">

                    {person.displayName}

                </span>

                {

                    person.exists &&

                    person.isReferenceOnly && (

                        <ReferenceOnlyBadge compact />

                    )

                }

            </div>

        </>

    );

    //
    // Unknown person
    //

    if (!person.exists) {

        return (

            <div

                className={`italic text-slate-500 ${className}`}

            >

                {content}

            </div>

        );

    }

    //
    // Reference-only person
    //

    if (person.isReferenceOnly) {

        return (

            <div

                className={`rounded-lg bg-slate-100 px-4 py-2 ${className}`}

            >

                {content}

            </div>

        );

    }

    //
    // Full person
    //

    return (

        <Link

            to={`/people/${person.person!.id}`}

            className={`block rounded-lg bg-slate-100 px-4 py-2 text-blue-600 transition hover:bg-blue-100 hover:text-blue-700 hover:underline ${className}`}

        >

            {content}

        </Link>

    );

}