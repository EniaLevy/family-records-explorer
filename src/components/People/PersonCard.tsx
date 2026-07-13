import { Link } from "react-router-dom";

import type { Person } from "../../types/Person";

import Portrait from "../Common/Portrait";

import {
    formatFrenchDate,
} from "../../utils/date";

import {
    getDocumentCount,
    getReferencedDocuments,
} from "../../services/archive";

interface PersonCardProps {

    person: Person;

}

export default function PersonCard({

    person,

}: PersonCardProps) {

    const ownedDocuments = getDocumentCount(person.id);

    const referencedDocuments =
        getReferencedDocuments(person.id).length;

    return (

        <Link
            to={`/people/${person.id}`}
            className="group block rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
        >

            <div className="mb-6">

                <Portrait
                    src={person.portrait}
                    alt={person.fullName}
                    size="md"
                />

            </div>

            <h2 className="mb-2 text-2xl font-semibold">

                {person.fullName}

            </h2>

            <p className="mb-6 text-gray-500">

                {formatFrenchDate(person.birthDate)}

                {person.deathDate &&
                    ` — ${formatFrenchDate(person.deathDate)}`}

            </p>

            <div className="space-y-4">

                <div>

                    <p className="text-xs uppercase tracking-widest text-gray-500">

                        Nationalité

                    </p>

                    <p>

                        {person.nationality}

                    </p>

                </div>

                <div className="flex gap-10">

                    <div>

                        <p className="text-xs uppercase tracking-widest text-gray-500">

                            Documents

                        </p>

                        <p className="text-xl font-semibold">

                            {ownedDocuments}

                        </p>

                    </div>

                    <div>

                        <p className="text-xs uppercase tracking-widest text-gray-500">

                            Mentions

                        </p>

                        <p className="text-xl font-semibold">

                            {referencedDocuments}

                        </p>

                    </div>

                </div>

            </div>

        </Link>

    );

}