export interface BaseRelationship {

    type: string;

}

export interface ParentChildRelationship
    extends BaseRelationship {

    type: "parent-child";

    parent: string;

    /**
     * Optional fallback name used when the parent
     * does not exist in people.json.
     */
    parentName?: string;

    parentRole: "father" | "mother";

    child: string;

    /**
     * Optional fallback name used when the child
     * does not exist in people.json.
     */
    childName?: string;

}

export interface MarriageRelationship
    extends BaseRelationship {

    type: "marriage";

    husband: string;

    /**
     * Optional fallback name used when the husband
     * does not exist in people.json.
     */
    husbandName?: string;

    wife: string;

    /**
     * Optional fallback name used when the wife
     * does not exist in people.json.
     */
    wifeName?: string;

}

export type Relationship =
    | ParentChildRelationship
    | MarriageRelationship;