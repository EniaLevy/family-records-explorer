import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import Home from "./pages/Home";
import People from "./pages/People";
import Documents from "./pages/Documents";
import DocumentRecord from "./pages/DocumentRecord";
import PersonRecord from "./pages/PersonRecord";
import FamilyTree from "./pages/FamilyTree";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/people"
                        element={<People />}
                    />

                    <Route
                        path="/people/:id"
                        element={<PersonRecord />}
                    />

                    <Route
                        path="/documents"
                        element={<Documents />}
                    />

                    <Route
                        path="/documents/:id"
                        element={<DocumentRecord />}
                    />

                    <Route
                        path="/family-tree"
                        element={<FamilyTree />}
                    />

                    <Route
                        path="/search"
                        element={<Search />}
                    />

                    <Route
                        path="*"
                        element={<NotFound />}
                    />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}