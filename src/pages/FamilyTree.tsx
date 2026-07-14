import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ReactFlow, {
    Controls,
    type Node,
} from "reactflow";

import "reactflow/dist/style.css";

import Breadcrumbs from "../components/Navigation/Breadcrumbs";

import FamilyNode from "../components/FamilyTree/FamilyNode";
import MarriageNode from "../components/FamilyTree/MarriageNode";

import {
    buildFamilyTree,
    type FamilyNodeData,
} from "../components/FamilyTree/familyTreeBuilder";

export default function FamilyTree() {

    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {

        const update = () => {

            setIsMobile(window.innerWidth < 768);

        };

        update();

        window.addEventListener("resize", update);

        return () =>

            window.removeEventListener("resize", update);

    }, []);

    const {

        nodes,

        edges,

    } = useMemo(

        () => buildFamilyTree(),

        []

    );

    return (

        <div className="flex h-[calc(100vh-72px)] md:h-[calc(100vh-90px)] flex-col">

            <Breadcrumbs

                items={[

                    {

                        label: "Accueil",

                        to: "/",

                    },

                    {

                        label: "Arbre généalogique",

                    },

                ]}

            />

            <header className="mb-6">

                <h1 className="mb-2 text-4xl md:text-5xl font-bold">

                    Arbre généalogique

                </h1>

                <p className="text-base md:text-lg text-gray-600">

                    Visualisation des liens familiaux établis par les documents de l'archive.

                </p>

                <div className="mt-5 flex flex-wrap items-center gap-4 md:gap-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 md:px-5 py-4">

                    <div className="flex items-center gap-3">

                        <div className="h-5 w-5 rounded border border-blue-300 bg-blue-50" />

                        <span className="text-sm text-slate-700">

                            Français / Française

                        </span>

                    </div>

                    <div className="flex items-center gap-3">

                        <div className="h-5 w-5 rounded border border-amber-300 bg-amber-50" />

                        <span className="text-sm text-slate-700">

                            Français + autre nationalité

                        </span>

                    </div>

                    <div className="flex items-center gap-3">

                        <div className="h-5 w-5 rounded border border-slate-300 bg-white" />

                        <span className="text-sm text-slate-700">

                            Autre nationalité

                        </span>

                    </div>

                    <div className="flex items-center gap-3">

                        <div className="h-5 w-5 rounded border border-dashed border-slate-400 bg-slate-50" />

                        <span className="text-sm text-slate-700">

                            Référence uniquement

                        </span>

                    </div>

                </div>

            </header>

            <div className="flex-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow">

                <ReactFlow

                    nodes={nodes}

                    edges={edges}

                    nodeTypes={{

                        family: FamilyNode,

                        marriage: MarriageNode,

                    }}

                    onNodeClick={(event, node) => {

                        if (node.type !== "family") {

                            return;

                        }

                        const familyNode =

                            node as Node<FamilyNodeData>;

                        if (

                            familyNode.data.person.isReferenceOnly

                        ) {

                            event.preventDefault();

                            return;

                        }

                        navigate(

                            `/people/${familyNode.data.person.id}`

                        );

                    }}

                    fitView

                    fitViewOptions={{

                        padding: isMobile ? 0.60 : 0.35,

                        maxZoom: isMobile ? 0.8 : 1,

                    }}

                    defaultViewport={{

                        x: 0,

                        y: 0,

                        zoom: isMobile ? 0.45 : 1,

                    }}

                    minZoom={0.25}

                    maxZoom={2}

                    nodesDraggable={false}

                    nodesConnectable={false}

                    elementsSelectable={true}

                    selectionOnDrag={false}

                    nodesFocusable={false}

                    edgesFocusable={false}

                    panOnDrag

                    zoomOnScroll

                    zoomOnPinch

                    panOnScroll={false}

                    attributionPosition="bottom-right"

                >

                    <Controls

                        showInteractive={false}

                        position="bottom-right"

                    />

                </ReactFlow>

            </div>

        </div>

    );

}