import { Dayjs } from 'dayjs';
import { ITaskCardData } from '@/shared/api';

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
