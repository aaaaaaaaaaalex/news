import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

/**
 * Возвращает отформатированную строку с датой и временем
 * @param date строка с датой и временем в формате "2023-05-01T02:01:04+0000"
 * @returns строка с датой и временем в формате "May 8, 2025, 16:01 PM"
 */

export function getDateAndTimeFormatted(date: string): string {
    const parcedDate = dayjs.utc(date, 'YYYY-MM-DDTHH:mm:ssZZ');
    const formatted = parcedDate.format('MMM D, YYYY, HH:mm A');
    return formatted;
}

