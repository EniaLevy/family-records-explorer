export function translateRole(role: string): string {

    const labels: Record<string, string> = {

        subject: "Sujet",
        holder: "Titulaire",

        father: "Père",
        mother: "Mère",

        grandfather: "Grand-père",
        grandmother: "Grand-mère",

        husband: "Époux",
        wife: "Épouse",

        child: "Enfant",

        deceased: "Décédé",

        father_of_husband: "Père de l'époux",
        mother_of_husband: "Mère de l'époux",

        father_of_wife: "Père de l'épouse",
        mother_of_wife: "Mère de l'épouse",

        witness: "Témoin",

    };

    return labels[role] ?? role;

}