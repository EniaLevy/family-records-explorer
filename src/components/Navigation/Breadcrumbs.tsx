import { Link } from "react-router-dom";

export interface BreadcrumbItem {
    label: string;
    to?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({
    items,
}: BreadcrumbsProps) {

    return (

        <nav className="mb-8 text-sm text-gray-500">

            <ol className="flex flex-wrap items-center gap-2">

                {items.map((item, index) => (

                    <li
                        key={index}
                        className="flex items-center gap-2"
                    >

                        {item.to ? (

                            <Link
                                to={item.to}
                                className="transition hover:text-blue-600"
                            >
                                {item.label}
                            </Link>

                        ) : (

                            <span className="font-medium text-gray-700">

                                {item.label}

                            </span>

                        )}

                        {index < items.length - 1 && (

                            <span className="text-gray-400">

                                ›

                            </span>

                        )}

                    </li>

                ))}

            </ol>

        </nav>

    );

}