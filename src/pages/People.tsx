import Breadcrumbs from "../components/Navigation/Breadcrumbs";
import PersonCard from "../components/People/PersonCard";

import { getPeople } from "../services/archive";

export default function People() {

    const people = getPeople();

    const fullPeople = people
        .filter(person => !person.isReferenceOnly)
        .sort((a, b) =>
            a.fullName.localeCompare(
                b.fullName,
                "fr",
                {
                    sensitivity: "base",
                }
            )
        );

    const referencePeople = people
        .filter(person => person.isReferenceOnly)
        .sort((a, b) =>
            a.fullName.localeCompare(
                b.fullName,
                "fr",
                {
                    sensitivity: "base",
                }
            )
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
                        label: "Personnes",
                    },
                ]}
            />

            <header className="mb-12">

                <h1 className="mb-3 text-5xl font-bold">

                    Personnes

                </h1>

                <p className="text-xl text-gray-600">

                    Toutes les personnes mentionnées dans les archives familiales.

                </p>

            </header>

            <section className="mb-16">

                <h2 className="mb-2 text-3xl font-semibold">

                    Dossiers individuels

                </h2>

                <p className="mb-8 text-gray-600">

                    Personnes disposant d'un dossier individuel complet dans l'archive.

                </p>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                    {fullPeople.map(person => (

                        <PersonCard
                            key={person.id}
                            person={person}
                        />

                    ))}

                </div>

            </section>

            {referencePeople.length > 0 && (

                <section>

                    <h2 className="mb-2 text-3xl font-semibold">

                        Références uniquement

                    </h2>

                    <p className="mb-8 text-gray-600">

                        Personnes apparaissant dans les documents et les relations familiales,
                        mais ne disposant pas encore d'un dossier individuel.

                    </p>

                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                        {referencePeople.map(person => (

                            <PersonCard
                                key={person.id}
                                person={person}
                            />

                        ))}

                    </div>

                </section>

            )}

        </div>

    );

}