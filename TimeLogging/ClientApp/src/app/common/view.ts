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

export interface Account {
  id: string;
  codeId: string;
  times: Time[];
}

export interface Record {
  id: string;
  codeId: string;
  date: Date;
  hours: number;
  minutes: number;
  seconds: number;
}
