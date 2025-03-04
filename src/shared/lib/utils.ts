import { type ErrorWithMessage, taskTypesOptions } from '../model';


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

  return Math.ceil(differenceInTime / (1000 * 3600 * 24)) > 0 ? Math.ceil(differenceInTime / (1000 * 3600 * 24)) : 0 ;
};


export const getColorByValue = (value: string): string | undefined => {
  const taskType = taskTypesOptions.find((option) => option.value === value);
  return taskType?.color;
};

export const getTitleByValue = (value: string): string | undefined => {
  const taskType = taskTypesOptions.find((option) => option.value === value);
  return taskType?.label;
};