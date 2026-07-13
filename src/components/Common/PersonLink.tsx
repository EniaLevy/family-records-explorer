import { Link } from "react-router-dom";

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

    return (

        <Link
            to={`/people/${person.id}`}
            className="flex items-center gap-4 rounded-xl border border-gray-200 p-3 transition hover:bg-gray-50"
        >

            <Portrait
                src={getAssetUrl(person.portrait)}
                alt={person.fullName}
                size="sm"
            />

            <div>

                <p className="font-medium">

                    {person.fullName}

                </p>

                {subtitle && (

                    <p className="text-sm text-gray-500">

                        {subtitle}

                    </p>

                )}

            </div>

        </Link>

    );

}