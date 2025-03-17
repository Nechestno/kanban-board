import { Dayjs } from 'dayjs';

export interface ITaskCardData {
  id: string,
  type: string,
  title: string,
  description?: string,
  dueDate: Dayjs,
  categoryId: string,
}
export interface IUpdateTaskCard {
  id: string,
  type?: string,
  title?: string,
  description?: string,
  dueDate?: Dayjs,
  categoryId: string,
}

export interface ICreateTaskCard extends ITaskCardData {
  categoryId: string,
}
