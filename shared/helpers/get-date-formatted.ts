import dayjs from 'dayjs';

/**
 * Возвращает отформатированную строку с датой
 * @param date строка с датой в формате "2023-05-01"
 * @returns строка с датой в формате "08.05.2025"
 */

export function getDateFormatted(date: string): string {
    return dayjs(date).format("DD.MM.YYYY");
}

