import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export default class DateUtil {
  private static readonly DATE_FORMAT = 'YYYY-MM-DD';
  static validateDateWithFormat(date: string): boolean {
    return dayjs(date, this.DATE_FORMAT, true).isValid();
  }

  static getDiffWeeksWithCurrent(date): number {
    const targetDate = dayjs(date);
    const currentDate = dayjs();
    const daysDiff = currentDate.diff(targetDate, 'day');
    return Math.floor(daysDiff / 7);
  }

  static getCurrentDate() {
    return dayjs().format(this.DATE_FORMAT);
  }
}
