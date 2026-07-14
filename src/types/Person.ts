export interface Person {

    id: string;

    fullName: string;

    givenNames?: string;

    surname?: string;

    gender?: "Male" | "Female";

    birthDate?: string | null;

    birthPlace?: string | null;

    deathDate?: string | null;

    deathPlace?: string | null;

    nationality?: string | null;

    portrait?: string | null;

    /**
     * True if this person exists only as a reference
     * in the archive and intentionally has no
     * dedicated Person page.
     */
    isReferenceOnly: boolean;

}