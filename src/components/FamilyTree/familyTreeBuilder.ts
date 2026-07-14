import dagre from "@dagrejs/dagre";

import type {
    Edge,
    Node,
} from "reactflow";

import {
    getPeople,
    getRelationships,
} from "../../services/archive";

import type {
    Person,
} from "../../types/Person";

import type {
    ParentChildRelationship,
    MarriageRelationship,
} from "../../types/Relationship";

const NODE_WIDTH = 230;
const NODE_HEIGHT = 145;

const MARRIAGE_WIDTH = 44;
const MARRIAGE_HEIGHT = 2;

const EDGE_STYLE = {
    stroke: "#64748b",
    strokeWidth: 2,
};

const EDGE_OPTIONS = {
    borderRadius: 6,
    offset: 8,
};

export interface FamilyNodeData {

    person: Person;

}

export function buildFamilyTree() {

    const graph = new dagre.graphlib.Graph();

    graph.setDefaultEdgeLabel(() => ({}));

    graph.setGraph({

        rankdir: "TB",

        nodesep: 120,

        ranksep: 180,

        marginx: 80,

        marginy: 80,

    });

    const relationshipData =
        getRelationships();

    const connectedIds =
        new Set<string>();

    relationshipData.forEach(

        relationship => {

            if (

                relationship.type === "marriage"

            ) {

                connectedIds.add(

                    relationship.husband

                );

                connectedIds.add(

                    relationship.wife

                );

            }

            else {

                connectedIds.add(

                    relationship.parent

                );

                connectedIds.add(

                    relationship.child

                );

            }

        }

    );

    const people =

        getPeople().filter(

            person =>

                connectedIds.has(

                    person.id

                )

        );

    people.forEach(

        person => {

            graph.setNode(

                person.id,

                {

                    width: NODE_WIDTH,

                    height: NODE_HEIGHT,

                }

            );

        }

    );

    const marriageNodes: Node[] = [];

    const edges: Edge[] = [];

    const spouseLookup =
        new Map<string, string>();

    const marriageLookup =
        new Map<string, string>();

    relationshipData

        .filter(

            (

                relationship

            ): relationship is MarriageRelationship =>

                relationship.type === "marriage"

        )

        .forEach(

            relationship => {

                const marriageId =

                    `marriage_${relationship.husband}_${relationship.wife}`;

                marriageLookup.set(

                    relationship.husband,

                    marriageId

                );

                marriageLookup.set(

                    relationship.wife,

                    marriageId

                );

                spouseLookup.set(

                    relationship.husband,

                    relationship.wife

                );

                spouseLookup.set(

                    relationship.wife,

                    relationship.husband

                );

                graph.setNode(

                    marriageId,

                    {

                        width: MARRIAGE_WIDTH,

                        height: MARRIAGE_HEIGHT,

                    }

                );

                marriageNodes.push({

                    id: marriageId,

                    type: "marriage",

                    position: {

                        x: 0,

                        y: 0,

                    },

                    draggable: false,

                    selectable: false,

                    connectable: false,

                    data: {},

                });

                graph.setEdge(

                    relationship.husband,

                    marriageId

                );

                graph.setEdge(

                    relationship.wife,

                    marriageId

                );

                edges.push(

                    {

                        id:

                            `${relationship.husband}_${marriageId}`,

                        source:

                            relationship.husband,

                        target:

                            marriageId,

                        type:

                            "smoothstep",

                        animated:

                            false,

                        style:

                            EDGE_STYLE,

                        pathOptions:

                            EDGE_OPTIONS,

                    },

                    {

                        id:

                            `${relationship.wife}_${marriageId}`,

                        source:

                            relationship.wife,

                        target:

                            marriageId,

                        type:

                            "smoothstep",

                        animated:

                            false,

                        style:

                            EDGE_STYLE,

                        pathOptions:

                            EDGE_OPTIONS,

                    }

                );

            }

        );

    const processedChildren =
        new Set<string>();

    relationshipData

        .filter(

            (

                relationship

            ): relationship is ParentChildRelationship =>

                relationship.type === "parent-child"

        )

        .forEach(

            relationship => {

                const marriageId =

                    marriageLookup.get(

                        relationship.parent

                    );

                const edgeSource =

                    marriageId ??

                    relationship.parent;

                const edgeKey =

                    `${edgeSource}->${relationship.child}`;

                if (

                    processedChildren.has(

                        edgeKey

                    )

                ) {

                    return;

                }

                processedChildren.add(

                    edgeKey

                );

                graph.setEdge(

                    edgeSource,

                    relationship.child

                );

                edges.push({

                    id: edgeKey,

                    source: edgeSource,

                    target: relationship.child,

                    type: "smoothstep",

                    animated: false,

                    style: EDGE_STYLE,

                    pathOptions: EDGE_OPTIONS,

                });

            }

        );

    dagre.layout(graph);

        const personNodes: Node<FamilyNodeData>[] =

        people.map(

            person => {

                const position =

                    graph.node(

                        person.id

                    );

                return {

                    id: person.id,

                    type: "family",

                    draggable: false,

                    selectable: false,

                    connectable: false,

                    position: {

                        x:

                            position.x -

                            NODE_WIDTH / 2,

                        y:

                            position.y -

                            NODE_HEIGHT / 2,

                    },

                    data: {

                        person,

                    },

                };

            }

        );

    marriageNodes.forEach(

        node => {

            const position =

                graph.node(

                    node.id

                );

            node.position = {

                x:

                    position.x -

                    MARRIAGE_WIDTH / 2,

                y:

                    position.y -

                    MARRIAGE_HEIGHT / 2,

            };

        }

    );

    return {

        nodes: [

            ...personNodes,

            ...marriageNodes,

        ],

        edges,

    };

}