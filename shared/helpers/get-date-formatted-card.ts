import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

export function getDateFormattedCard(date: string): string {
    // "2023-05-01T02:01:04+0000"
    const parcedDate = dayjs.utc(date, 'YYYY-MM-DDTHH:mm:ssZZ');
    const formatted = parcedDate.format('MMM D, YYYY, HH:mm A');
    return formatted;
}

