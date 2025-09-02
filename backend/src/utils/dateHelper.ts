export function addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}

export function formatYearMonth(date: Date): string {
    return date.toISOString().slice(0, 7); // YYYY-MM
}

export function isValidDate(date: string): boolean {
    return /^\d{4}-\d{2}$/.test(date);
}
