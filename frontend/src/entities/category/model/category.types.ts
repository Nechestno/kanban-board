import { ICategoryData, ITaskCardData } from '@/shared/api';

export interface ICategoryDataWithTasks extends ICategoryData  {
  tasks: ITaskCardData[];
}