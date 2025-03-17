import type { ITaskCardData } from '@/entities/task/@x/category';

export interface ICategoryData {
  id: string,
  name: string,
  boardId: string,
}

export interface ICategoryDataCreate {
  name: string,
  boardId: string,
}

export interface ICategoryDataWithTasks extends ICategoryData  {
  tasks: ITaskCardData[];
}