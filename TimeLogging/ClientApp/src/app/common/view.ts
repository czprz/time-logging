export enum View {
  Day,
  Week,
  Month,
}

export interface Week {
  monday: Date | null,
  tuesday: Date | null,
  wednesday: Date | null,
  thursday: Date | null,
  friday: Date | null,
  saturday: Date | null,
  sunday: Date | null
}

export interface Time {
  id: string;
  code: string;
  date: Date;
  time: string;
}

// export interface Account {
//   id: string;
//   codeId: string;
//   times: Time[];
// }

export interface Record {
  id: string;
  codeId: string;
  date: Date;
  hours: number;
  minutes: number;
  seconds: number;
}

export enum Day {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

export class Records {
  public id!: string;
  public codeId!: string

  private timeMap = new Map<string, Record>();

  constructor(record: Record) {
    this.id = record.id;
    this.codeId = record.codeId;

    const day = this.getDay(record.date);
    this.timeMap.set(day, record);
  }

  public add(record: Record) {
    if (record.id != this.id) {
      throw new Error('Cannot add record with different id');
    }

    const day = this.getDay(record.date);
    this.timeMap.set(day, record);
  }

  public getTime(date: Date) {
    if (date == null) {
      return null;
    }

    const day = this.getDay(date);
    return this.timeMap.get(day);
  }

  private getDay(date: Date) {
    return date.toISOString().split('T')[0];
  }
}
