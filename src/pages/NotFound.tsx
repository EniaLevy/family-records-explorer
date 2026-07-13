import { Link } from "react-router-dom";

export default function NotFound() {

    return (

        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">

            <h1 className="mb-4 text-8xl font-bold text-blue-700">

                404

            </h1>

            <h2 className="mb-3 text-3xl font-semibold">

                Page introuvable

            </h2>

            <p className="mb-8 max-w-xl text-lg text-gray-600">

                La page demandée n'existe pas ou a été déplacée.

            </p>

            <Link
                to="/"
                className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >

                Retour à l'accueil

            </Link>

        </div>

    );

}