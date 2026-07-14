export interface DocumentSubject {

    person: string;

    /**
     * Optional fallback name used when the referenced
     * person does not exist in people.json.
     */
    name?: string;

}

export interface ReferencedPerson {

    person: string;

    /**
     * Optional fallback name used when the referenced
     * person does not exist in people.json.
     */
    name?: string;

    role: string;

}

export interface DocumentAsset {

    id: string;

    type: "pdf" | "image";

    path: string;

}

export interface DocumentVersion {

    id: string;

    label: string;

    description?: string;

    assets: DocumentAsset[];

}

export interface ArchiveDocument {

    id: string;

    title: string;

    documentType: string;

    subjects: DocumentSubject[];

    referencedPeople: ReferencedPerson[];

    versions: DocumentVersion[];

    creationDate?: string;

    issueDate?: string;

    country?: string;

    authority?: string;

    source?: {

        label: string;

        url?: string | null;

        archiveReference?: string | null;

    };

}