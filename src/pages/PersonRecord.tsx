import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import PersonReference from "../components/Common/PersonReference";
import {
    FaBirthdayCake,
    FaFlag,
    FaUserFriends,
} from "react-icons/fa";

import { getAssetUrl } from "../utils/assets";

import {
    getPersonDisplay,
} from "../services/personDisplay";

import Breadcrumbs from "../components/Navigation/Breadcrumbs";
import DocumentListItem from "../components/People/DocumentListItem";

import {
    getPerson,
    getDocumentsForPerson,
    getReferencedDocuments,
    getFatherRelationship,
    getMotherRelationship,
    getChildrenRelationships,
    getMarriageRelationships,
} from "../services/archive";

export default function PersonRecord() {

    const { id } = useParams();

    useEffect(() => {

        window.scrollTo(0, 0);

    }, [id]);

    const person = getPerson(id ?? "");

    if (!person) {

        return (

            <div>

                <h1 className="text-4xl md:text-5xl font-bold">

                    Personne introuvable

                </h1>

            </div>

        );

    }

    if (person.isReferenceOnly) {

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

                <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-slate-300 bg-slate-50 p-10 text-center shadow-sm">

                    <h1 className="mb-4 text-4xl font-bold">

                        Dossier individuel indisponible

                    </h1>

                    <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600">

                        <strong>{person.fullName}</strong> est bien mentionné(e)
                        dans les archives familiales, mais ne dispose pas encore
                        d'un dossier individuel.

                    </p>

                    <Link

                        to="/people"

                        className="inline-flex rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"

                    >

                        ← Retour aux personnes

                    </Link>

                </div>

            </div>

        );

    }

    const mainDocuments =
        getDocumentsForPerson(person.id);

    const referencedDocuments =
        getReferencedDocuments(person.id);

    const fatherRelationship =
        getFatherRelationship(person.id);

    const motherRelationship =
        getMotherRelationship(person.id);

    const marriageRelationships =
        getMarriageRelationships(person.id);

    const childrenRelationships =
        getChildrenRelationships(person.id);

    const father =
        fatherRelationship
            ? getPersonDisplay(
                fatherRelationship.parent,
                fatherRelationship.parentName
            )
            : undefined;

    const mother =
        motherRelationship
            ? getPersonDisplay(
                motherRelationship.parent,
                motherRelationship.parentName
            )
            : undefined;

    const spouses =
        marriageRelationships.map(relationship => {

            const spouseId =
                relationship.husband === person.id
                    ? relationship.wife
                    : relationship.husband;

            const spouseName =
                relationship.husband === person.id
                    ? relationship.wifeName
                    : relationship.husbandName;

            return getPersonDisplay(
                spouseId,
                spouseName
            );

        });

    const children =
        childrenRelationships.map(relationship =>

            getPersonDisplay(

                relationship.child,

                relationship.childName

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
                        to: "/people",
                    },
                    {
                        label: person.fullName,
                    },
                ]}
            />

            <header className="mb-10 flex flex-col lg:flex-row gap-8 lg:gap-10">

                <div className="flex justify-center lg:block shrink-0">

                    {person.portrait ? (

                        <img
                            src={getAssetUrl(person.portrait)}
                            alt={person.fullName}
                            className="h-48 w-48 md:h-56 md:w-56 rounded-3xl object-cover shadow"
                        />

                    ) : (

                        <div className="flex h-48 w-48 md:h-56 md:w-56 items-center justify-center rounded-3xl bg-slate-200 text-6xl md:text-7xl text-slate-500">

                            👤

                        </div>

                    )}

                </div>

                <div className="flex-1">

                    <h1 className="mb-3 text-4xl md:text-5xl lg:text-6xl font-bold text-center lg:text-left">

                        {person.fullName}

                    </h1>

                    <div className="mt-8 grid gap-6 md:grid-cols-2">

                        <div className="rounded-2xl border bg-white p-5 md:p-6 shadow-sm">

                            <h2 className="mb-5 text-xl md:text-2xl font-semibold">

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

                        <div className="rounded-2xl border bg-white p-5 md:p-6 shadow-sm">

                            <h2 className="mb-5 text-xl md:text-2xl font-semibold">

                                Famille

                            </h2>

                            <div className="space-y-4">

                                {father && (

                                    <div>

                                        <br />

                                        <PersonReference

                                            person={father}

                                            role="Père"

                                        />

                                    </div>

                                )}

                                {mother && (

                                    <div>

                                        <br />

                                        <PersonReference

                                            person={mother}

                                            role="Mère"

                                        />

                                    </div>

                                )}

                                {spouses.length > 0 && (

                                    <div>

                                        <div className="mt-2 space-y-1">

                                            {spouses.map((spouse, index) => (

                                                <PersonReference

                                                    key={index}

                                                    person={spouse}

                                                    role="Conjoint"

                                                />

                                            ))}

                                        </div>

                                    </div>

                                )}

                                {children.length > 0 && (

                                    <div>
                                        
                                        <div className="mt-2 space-y-1">

                                            {children.map((child, index) => (

                                                <PersonReference

                                                    key={index}

                                                    person={child}

                                                    role="Enfant"

                                                />

                                            ))}

                                        </div>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </header>

            <section className="mb-12 md:mb-14">

                <div className="mb-6 md:mb-8 flex items-center gap-3">

                    <FaUserFriends className="text-blue-600" />

                    <h2 className="text-2xl md:text-3xl font-bold">

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

                <div className="mb-6 md:mb-8 flex items-center gap-3">

                    <FaUserFriends className="text-blue-600" />

                    <h2 className="text-2xl md:text-3xl font-bold">

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