import { type ErrorWithMessage } from '../model';


export const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof (error as Record<string, unknown>).data === 'object'
  );
};

export const calculateDaysDifference = (dueDate: number) => {
  const currentDate = new Date();
  const dueDateObj = new Date(dueDate);

  const differenceInTime = dueDateObj.getTime() - currentDate.getTime();

  return Math.ceil(differenceInTime / (1000 * 3600 * 24));
};