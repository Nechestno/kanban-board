import dayjs, { Dayjs } from 'dayjs';
import { type ErrorWithMessage } from '../model';

export const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof (error as Record<string, unknown>).data === 'object'
  );
};

export const calculateDaysDifference = (dueDate: Dayjs) : number => {
  const currentDate = dayjs();
  const differenceInTime = dueDate.diff(currentDate);

  return differenceInTime > 0 ? Math.ceil(differenceInTime / (1000 * 3600 * 24)) : 0;
};


