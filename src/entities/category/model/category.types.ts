import { ITaskCardData } from '@/entities/task/model/cards.types.ts';

export interface ICategoryData {
  id: string,
  name: string,
  tagColor: string,
}

export interface IResponseCategoryData extends ICategoryData {
  tasks: ITaskCardData[] | null;
}