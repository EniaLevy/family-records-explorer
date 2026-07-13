import { Link, NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">

            <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-8">

                <Link
                    to="/"
                    className="text-2xl font-bold tracking-tight"
                >
                    🇫🇷 Archives familiales Levy–Cerff
                </Link>

                <nav className="flex items-center gap-2">

                    <NavLink
                        to="/people"
                        className={({ isActive }) =>
                            `rounded-lg px-4 py-2 transition ${
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-gray-100"
                            }`
                        }
                    >
                        Personnes
                    </NavLink>

                    <NavLink
                        to="/documents"
                        className={({ isActive }) =>
                            `rounded-lg px-4 py-2 transition ${
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-gray-100"
                            }`
                        }
                    >
                        Documents
                    </NavLink>

                    <NavLink
                        to="/tree"
                        className={({ isActive }) =>
                            `rounded-lg px-4 py-2 transition ${
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-gray-100"
                            }`
                        }
                    >
                        Arbre généalogique
                    </NavLink>

                    <NavLink
                        to="/search"
                        className={({ isActive }) =>
                            `rounded-lg px-4 py-2 transition ${
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-gray-100"
                            }`
                        }
                    >
                        Recherche
                    </NavLink>

                </nav>

            </div>

        </header>
    );
}