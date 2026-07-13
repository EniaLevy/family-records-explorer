const DOCUMENT_TYPE_LABELS: Record<string, string> = {

    birth_certificate: "Actes de naissance",

    birth_record_reference: "Mentions de naissance",

    marriage_certificate: "Actes de mariage",

    death_certificate: "Actes de décès",

    death_record_reference: "Mentions de décès",

    livret_famille: "Livrets de famille",

    passport: "Passeports",

    identity_card: "Cartes nationales d'identité",

    military_record: "Documents militaires",

    consular_registration: "Immatriculations consulaires",

    immigration_record: "Documents d'immigration",

};

export function getDocumentTypeLabel(
    type: string
): string {

    return DOCUMENT_TYPE_LABELS[type] ?? type;

}