export function formatISOStringToUserFriendlyDate(isoString: string): string {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formateDateToISO(date: any) {
    return date && typeof date.toDate === "function"
        ? date.toDate().toISOString()
        : typeof date === "string"
          ? date
          : null;
}
