export interface ITaskCardData {
  id: string,
  type: string,
  title: string,
  description: string,
  dueDate: number,
}

export interface ICreateTaskCard extends ITaskCardData {
  categoryId: string,
}
