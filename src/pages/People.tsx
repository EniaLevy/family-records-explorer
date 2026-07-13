import Breadcrumbs from "../components/Navigation/Breadcrumbs";
import PersonCard from "../components/People/PersonCard";

import { getPeople } from "../services/archive";

export default function People() {

    const people = getPeople();

    return (

        <div>

            <Breadcrumbs
                items={[
                    {
                        label: "Accueil",
                        to: "/",
                    },
                    {
                        label: "Personnes",
                    },
                ]}
            />

            <header className="mb-12">

                <h1 className="mb-3 text-5xl font-bold">

                    Personnes

                </h1>

                <p className="text-xl text-gray-600">

                    Toutes les personnes présentes dans les archives familiales.

                </p>

            </header>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                {people.map((person) => (

                    <PersonCard
                        key={person.id}
                        person={person}
                    />

                ))}

            </div>

        </div>

    );

}