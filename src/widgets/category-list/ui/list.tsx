import {  useGetAllCategoriesWithTasksByBoardIdQuery } from '@/entities/category';
import { DroppableCategory } from '@/features/category/droppable-category';
import {  useUpdateTaskMutation } from '@/entities/task';
import './list.scss';
import { IBoardData } from '@/entities/board';




export const CategoryList = ({ id: boardId }: Omit<IBoardData,'name'>) => {
  const { data: categories, error: categoryError } =
    useGetAllCategoriesWithTasksByBoardIdQuery(boardId);
  const [updateTask] = useUpdateTaskMutation();

  const handleTaskDrop = async ( taskId: string, newCategoryId:string ) => {
    try {
      updateTask({id: taskId,categoryId: newCategoryId}).unwrap(); //TODO Посмотреть типизацию
      console.log(`Task ${taskId} moved to category ${newCategoryId}`);
    } catch (error) {
      console.error('Failed to move task:', error);
    }
  };

  if (categoryError) {
    return <h4>Создайте раздел</h4>;
  }

  return (
    <div className="category-list">
        {categories?.map((category) => (
            <DroppableCategory
              key={category.id}
              category={category}
              onTaskDrop={handleTaskDrop}
            />
            ))}
          </div>
        );
};