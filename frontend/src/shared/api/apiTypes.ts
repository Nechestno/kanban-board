import { Dayjs } from 'dayjs';

export interface IBoardData {
  id: string;
  name: string;
}

export interface ICategoryData {
  id: string,
  name: string,
  boardId: string,
}

export interface ITaskCardData {
  id: string,
  type: string,
  taskNumber: number,
  title: string,
  description?: string,
  dueDate: Dayjs,
  categoryId: string,
}

export interface IUserData {
  name: string,
  login: string;
  password: string;
}