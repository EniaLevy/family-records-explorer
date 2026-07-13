import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? "rounded-lg bg-blue-600 px-5 py-3 font-medium text-white"
            : "rounded-lg px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-100";

    return (

        <div className="min-h-screen bg-slate-50">

            <header className="border-b border-gray-200 bg-white">

                <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">

                    <NavLink
                        to="/"
                        className="flex items-center font-bold text-gray-800 whitespace-nowrap"
                    >

                        <span className="mr-2 text-lg font-normal">
                            FR
                        </span>

                        <span className="hidden lg:inline text-2xl">
                            Archives familiales Levy–Cerff
                        </span>

                        <span className="hidden md:inline lg:hidden text-2xl">
                            Levy–Cerff
                        </span>

                    </NavLink>

                    <nav className="flex items-center gap-2">

                        <NavLink
                            to="/people"
                            className={linkClass}
                        >
                            Personnes
                        </NavLink>

                        <NavLink
                            to="/documents"
                            className={linkClass}
                        >
                            Documents
                        </NavLink>

                        <NavLink
                            to="/family-tree"
                            className={linkClass}
                        >
                            Arbre généalogique
                        </NavLink>

                        <NavLink
                            to="/search"
                            className={linkClass}
                        >
                            Recherche
                        </NavLink>

                    </nav>

                </div>

            </header>

            <main className="mx-auto max-w-7xl px-6 py-10">

                <Outlet />

            </main>

        </div>

    );

}