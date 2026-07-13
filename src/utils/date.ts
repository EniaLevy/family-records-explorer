export interface ArchiveDate {

    day: number | null;

    month: number | null;

    year: number;

}

function monthName(month: number): string {

    return new Intl.DateTimeFormat(
        "fr-FR",
        {
            month: "long",
        }
    ).format(new Date(2000, month - 1, 1));

}

/*
    Supported formats

    YYYY

    MM-YYYY

    DD-MM-YYYY
*/

export function parseArchiveDate(

    value?: string | null

): ArchiveDate | null {

    if (!value) {

        return null;

    }

    const parts = value.split("-");

    if (parts.length === 1) {

        return {

            day: null,
            month: null,
            year: Number(parts[0]),

        };

    }

    if (parts.length === 2) {

        return {

            day: null,
            month: Number(parts[0]),
            year: Number(parts[1]),

        };

    }

    if (parts.length === 3) {

        return {

            day: Number(parts[0]),
            month: Number(parts[1]),
            year: Number(parts[2]),

        };

    }

    return null;

}

export function formatFrenchDate(

    value?: string | null

): string {

    const date = parseArchiveDate(value);

    if (!date) {

        return "Date inconnue";

    }

    if (

        date.day !== null &&

        date.month !== null

    ) {

        return `${date.day} ${monthName(date.month)} ${date.year}`;

    }

    if (

        date.month !== null

    ) {

        return `${monthName(date.month)} ${date.year}`;

    }

    return String(date.year);

}

export function formatFrenchYear(

    value?: string | null

): string {

    const date = parseArchiveDate(value);

    return date

        ? String(date.year)

        : "";

}

export function hasArchiveDate(

    value?: string | null

): boolean {

    return parseArchiveDate(value) !== null;

}