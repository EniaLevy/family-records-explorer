import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface NavigationCardProps {

    icon: ReactNode;

    title: string;

    description: string;

    to: string;

}

export default function NavigationCard({

    icon,

    title,

    description,

    to,

}: NavigationCardProps) {

    return (

        <Link
            to={to}
            className="group block rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
        >

            <div className="mb-6 text-5xl text-blue-600 transition-transform duration-200 group-hover:scale-110">

                {icon}

            </div>

            <h2 className="mb-3 text-3xl font-semibold">

                {title}

            </h2>

            <p className="text-lg leading-relaxed text-gray-600">

                {description}

            </p>

        </Link>

    );

}