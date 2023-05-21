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

  static nextWeek(date: Date) {
    return new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
  }

  static previousWeek(date: Date) {
    return new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  static getFirstDayOfWeek(date: Date) {
    const currentDayOfWeek = date.getDay();

    if (currentDayOfWeek === 1) {
      return date;
    }

    let difference = currentDayOfWeek - 1;
    if (difference < 0) {
      difference = 6;
    }

    return new Date(date.getTime() - difference * 24 * 60 * 60 * 1000);
  }

  static getLastDayOfWeek(date: Date) {
    const currentDayOfWeek = date.getDay();
    let lastDayOfWeek = date;

    if (currentDayOfWeek !== 0) {
      const difference = 7 - currentDayOfWeek;

      lastDayOfWeek = new Date(
        date.getTime() + difference * 24 * 60 * 60 * 1000
      );
    }

    lastDayOfWeek.setHours(23, 59, 59, 999);

    return lastDayOfWeek;
  }

  static lastWorkDayOfTheWeek(date: Date) {
    const currentDayOfWeek = date.getDay();

    let difference = 5 - currentDayOfWeek;
    if (difference <= 0) {
      difference += 7;
    }

    const lastWorkDayOfTheWeek = new Date(
      date.getTime() + difference * 24 * 60 * 60 * 1000
    );

    lastWorkDayOfTheWeek.setHours(23, 59, 59, 999);

    return lastWorkDayOfTheWeek;
  }
}
