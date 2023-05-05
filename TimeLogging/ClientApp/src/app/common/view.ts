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
  code: string;
  times: Time[];
}
