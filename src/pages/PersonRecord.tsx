import { Link, useParams } from "react-router-dom";
import {
    FaBirthdayCake,
    FaFlag,
    FaUserFriends,
} from "react-icons/fa";

import Breadcrumbs from "../components/Navigation/Breadcrumbs";
import DocumentListItem from "../components/People/DocumentListItem";

import {
    getPerson,
    getDocumentsForPerson,
    getReferencedDocuments,
    getFather,
    getMother,
    getChildren,
    getSpouses,
} from "../services/archive";

export default function PersonRecord() {

    const { id } = useParams();

    const person = getPerson(id ?? "");

    if (!person) {

        return (

            <div>

                <h1 className="text-5xl font-bold">

                    Personne introuvable

                </h1>

            </div>

        );

    }

    const mainDocuments =
        getDocumentsForPerson(person.id);

    const referencedDocuments =
        getReferencedDocuments(person.id);

    const father = getFather(person.id);

    const mother = getMother(person.id);

    const spouses = getSpouses(person.id);

    const children = getChildren(person.id);

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
                        to: "/people",
                    },
                    {
                        label: person.fullName,
                    },
                ]}
            />

            <header className="mb-12 flex gap-10">

                <div>

                    {person.portrait ? (

                        <img
                            src={person.portrait}
                            alt={person.fullName}
                            className="h-56 w-56 rounded-3xl object-cover shadow"
                        />

                    ) : (

                        <div className="flex h-56 w-56 items-center justify-center rounded-3xl bg-slate-200 text-7xl text-slate-500">

                            👤

                        </div>

                    )}

                </div>

                <div className="flex-1">

                    <h1 className="mb-3 text-6xl font-bold">

                        {person.fullName}

                    </h1>

                    <div className="mt-8 grid gap-6 md:grid-cols-2">

                        <div className="rounded-2xl border bg-white p-6 shadow-sm">

                            <h2 className="mb-5 text-2xl font-semibold">

                                Informations

                            </h2>

                            <div className="space-y-4">

                                {person.birthDate && (

                                    <div className="flex items-center gap-3">

                                        <FaBirthdayCake />

                                        <span>

                                            {person.birthDate}

                                        </span>

                                    </div>

                                )}

                                {person.birthPlace && (

                                    <div>

                                        <strong>Lieu de naissance</strong>

                                        <p>

                                            {person.birthPlace}

                                        </p>

                                    </div>

                                )}

                                {person.nationality && (

                                    <div className="flex items-center gap-3">

                                        <FaFlag />

                                        <span>

                                            {person.nationality}

                                        </span>

                                    </div>

                                )}

                            </div>

                        </div>

                        <div className="rounded-2xl border bg-white p-6 shadow-sm">

                            <h2 className="mb-5 text-2xl font-semibold">

                                Famille

                            </h2>

                            <div className="space-y-4">

                                {father && (

                                    <div>

                                        <strong>Père</strong>

                                        <br />

                                        <Link
                                            to={`/people/${father.id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {father.fullName}
                                        </Link>

                                    </div>

                                )}

                                {mother && (

                                    <div>

                                        <strong>Mère</strong>

                                        <br />

                                        <Link
                                            to={`/people/${mother.id}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {mother.fullName}
                                        </Link>

                                    </div>

                                )}

                                {spouses.length > 0 && (

                                    <div>

                                        <strong>Conjoint</strong>

                                        <div className="mt-2 space-y-1">

                                            {spouses.map((spouse) => (

                                                <Link
                                                    key={spouse.id}
                                                    to={`/people/${spouse.id}`}
                                                    className="block text-blue-600 hover:underline"
                                                >
                                                    {spouse.fullName}
                                                </Link>

                                            ))}

                                        </div>

                                    </div>

                                )}

                                {children.length > 0 && (

                                    <div>

                                        <strong>Enfants</strong>

                                        <div className="mt-2 space-y-1">

                                            {children.map((child) => (

                                                <Link
                                                    key={child.id}
                                                    to={`/people/${child.id}`}
                                                    className="block text-blue-600 hover:underline"
                                                >
                                                    {child.fullName}
                                                </Link>

                                            ))}

                                        </div>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </header>

            <section className="mb-14">

                <div className="mb-8 flex items-center gap-3">

                    <FaUserFriends className="text-blue-600" />

                    <h2 className="text-3xl font-bold">

                        Documents principaux

                    </h2>

                </div>

                <div className="space-y-5">

                    {mainDocuments.length > 0 ? (

                        mainDocuments.map((document) => (

                            <DocumentListItem
                                key={document.id}
                                document={document}
                            />

                        ))

                    ) : (

                        <p className="text-gray-500">

                            Aucun document principal.

                        </p>

                    )}

                </div>

            </section>

            <section>

                <div className="mb-8 flex items-center gap-3">

                    <FaUserFriends className="text-blue-600" />

                    <h2 className="text-3xl font-bold">

                        Mentionné dans

                    </h2>

                </div>

                <div className="space-y-5">

                    {referencedDocuments.length > 0 ? (

                        referencedDocuments.map((document) => (

                            <DocumentListItem
                                key={document.id}
                                document={document}
                            />

                        ))

                    ) : (

                        <p className="text-gray-500">

                            Aucun document.

                        </p>

                    )}

                </div>

            </section>

        </div>

    );

}