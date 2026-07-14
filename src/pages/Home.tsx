import Breadcrumbs from "../components/Navigation/Breadcrumbs";

import NavigationCard from "../components/Home/NavigationCard";

import {
    FaUsers,
    FaFolder,
    FaProjectDiagram,
    FaSearch,
} from "react-icons/fa";

export default function Home() {

    return (

        <div>

            <Breadcrumbs
                items={[
                    {
                        label: "Accueil",
                    },
                ]}
            />

            <section className="mb-10 md:mb-14">

                <h1 className="mb-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">

                    Archive familiale française

                </h1>

                <p className="max-w-4xl text-lg md:text-xl leading-relaxed text-gray-600">

                    Cette archive numérique rassemble les actes d'état civil
                    et les documents officiels concernant les familles
                    Levy et Cerff.

                </p>

            </section>

            <div className="grid gap-5 md:gap-8 md:grid-cols-2">

                <NavigationCard
                    icon={<FaUsers />}
                    title="Personnes"
                    description="Consulter les personnes présentes dans l'archive."
                    to="/people"
                />

                <NavigationCard
                    icon={<FaFolder />}
                    title="Documents"
                    description="Explorer les actes et documents officiels."
                    to="/documents"
                />

                <NavigationCard
                    icon={<FaProjectDiagram />}
                    title="Arbre généalogique"
                    description="Visualiser les liens familiaux."
                    to="/family-tree"
                />

                <NavigationCard
                    icon={<FaSearch />}
                    title="Recherche"
                    description="Rechercher rapidement une personne ou un document."
                    to="/search"
                />

            </div>

        </div>

    );

}