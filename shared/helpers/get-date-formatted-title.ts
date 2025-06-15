import dayjs from 'dayjs';

export function getDateFormattedTitle(date: string): string {
    // "2023-05-01"
    return dayjs(date).format("DD.MM.YYYY");
}

