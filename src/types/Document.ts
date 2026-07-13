export interface DocumentAsset {

    type:
        | "pdf"
        | "image";

    path: string;

}

export interface DocumentVersion {

    id: string;

    label: string;

    description?: string;

    assets: DocumentAsset[];

}

export interface ReferencedPerson {

    person: string;

    role: string;

}

export interface DocumentEvent {

    id: string;

    type: string;

    date?: string | null;

    place?: string | null;

    people: string[];

}

export interface ArchiveDocument {

    id: string;

    title: string;

    documentType: string;

    subjects: string[];

    holders: string[];

    referencedPeople: ReferencedPerson[];

    creationDate?: string | null;

    issueDate?: string | null;

    authority?: string | null;

    country?: string | null;

    language?: string | null;

    source?: string | null;

    notes?: string | null;

    events: DocumentEvent[];

    versions: DocumentVersion[];

}