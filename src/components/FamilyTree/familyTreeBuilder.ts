import dagre from "@dagrejs/dagre";

import type {
    Edge,
    Node,
} from "reactflow";

import {
    getPeople,
} from "../../services/archive";

import type {
    Person,
} from "../../types/Person";

import relationships from "../../data/relationships.json";

import type {
    Relationship,
    ParentChildRelationship,
    MarriageRelationship,
} from "../../types/Relationship";

const relationshipData =
    relationships as unknown as Relationship[];

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

    const people = getPeople();

    people.forEach(person => {

        graph.setNode(

            person.id,

            {

                width: NODE_WIDTH,

                height: NODE_HEIGHT,

            }

        );

    });

    const marriageNodes: Node[] = [];

    const edges: Edge[] = [];

    relationshipData

        .filter(

            (

                relationship

            ): relationship is MarriageRelationship =>

                relationship.type === "marriage"

        )

        .forEach(relationship => {

            const marriageId =

                `marriage_${relationship.husband}_${relationship.wife}`;

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

                    id: `${relationship.husband}_${marriageId}`,

                    source: relationship.husband,

                    target: marriageId,

                    type: "smoothstep",

                    animated: false,

                    style: EDGE_STYLE,

                    pathOptions: EDGE_OPTIONS,

                },

                {

                    id: `${relationship.wife}_${marriageId}`,

                    source: relationship.wife,

                    target: marriageId,

                    type: "smoothstep",

                    animated: false,

                    style: EDGE_STYLE,

                    pathOptions: EDGE_OPTIONS,

                }

            );

            const children = [

                ...new Set(

                    relationshipData

                        .filter(

                            (

                                relation

                            ): relation is ParentChildRelationship =>

                                relation.type === "parent-child"

                                && (

                                    relation.parent === relationship.husband ||

                                    relation.parent === relationship.wife

                                )

                        )

                        .map(

                            relation => relation.child

                        )

                )

            ];

            children.forEach(child => {

                graph.setEdge(

                    marriageId,

                    child

                );

                edges.push({

                    id: `${marriageId}_${child}`,

                    source: marriageId,

                    target: child,

                    type: "smoothstep",

                    animated: false,

                    style: EDGE_STYLE,

                    pathOptions: EDGE_OPTIONS,

                });

            });

        });

    dagre.layout(graph);

    const personNodes: Node<FamilyNodeData>[] =

        people.map(person => {

            const position =

                graph.node(person.id);

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

        });

    marriageNodes.forEach(node => {

        const position =

            graph.node(node.id);

        node.position = {

            x:

                position.x -

                MARRIAGE_WIDTH / 2,

            y:

                position.y -

                MARRIAGE_HEIGHT / 2,

        };

    });

    return {

        nodes: [

            ...personNodes,

            ...marriageNodes,

        ],

        edges,

    };

}