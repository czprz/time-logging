export class DateHelper {
  static getNextMonday(date: Date) {
    const newDate = new Date();
    const daysUntilMonday = (8 - date.getDay()) % 7;
    if (daysUntilMonday === 0) {
      newDate.setDate(date.getDate() + 7);
      return newDate;
    }

    newDate.setDate(date.getDate() + daysUntilMonday);
    return newDate;
  }

  static getPreviousMonday(date: Date) {
    const newDate = new Date();
    const daysUntilMonday = (8 - date.getDay()) % 7;
    if (daysUntilMonday === 0) {
      newDate.setDate(date.getDate() - 7);
      return newDate;
    }

    newDate.setDate(date.getDate() - daysUntilMonday);
    return newDate;
  }
}
