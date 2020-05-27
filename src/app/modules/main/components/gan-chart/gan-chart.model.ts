import * as dayjs from 'dayjs';

export interface AxisModel {
    weeks: AxisWeek[];
}

export interface AxisWeek {
    days: AxisDay[];
    title: string;
}

export interface AxisDay {
    value: dayjs.Dayjs;
    title: string;
    isToday?: boolean;
}
