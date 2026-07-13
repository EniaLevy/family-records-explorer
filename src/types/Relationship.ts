export interface ParentChildRelationship {

    type: "parent-child";

    parent: string;

    child: string;

    parentRole: "father" | "mother";

    evidenceDocuments?: string[];

}

export interface MarriageRelationship {

    type: "marriage";

    husband: string;

    wife: string;

    marriageDate?: string | null;

    marriagePlace?: string | null;

    divorceDate?: string | null;

    evidenceDocuments?: string[];

}

export type Relationship =
    | ParentChildRelationship
    | MarriageRelationship;