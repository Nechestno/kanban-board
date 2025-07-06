import React from 'react';
import { useCreateBoardMutation } from '@/entities/board';
import { useCreateCategoryMutation } from '@/entities/category';
import { IBoardData } from '@/shared/api';
import { isErrorWithMessage } from '@/shared/lib';
import { useModal } from '@/shared/lib';
import { basicCategories } from '@/shared/model/constants.ts';
import { CustomFormInput } from '@/shared/ui/custom-input';
import { CustomModal } from '@/shared/ui/custom-modal';

type BoardModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
};

export const CreateBoardModal: React.FC<BoardModalProps> = ({ isModalOpen, onClose }) => {
  const [createBoard] = useCreateBoardMutation();
  const [createCategory] = useCreateCategoryMutation();
  const { showSuccess, showError } = useModal();


  const handleFormSubmit = async (data: IBoardData) => {
    try {
      const boardResponse = await createBoard(data).unwrap();

      for(const elem of basicCategories) {
        await createCategory({name: elem, boardId: boardResponse.id}).unwrap()
      }

      showSuccess('Доска успешно создана');
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        showError(err.data.message);
      } else {
        showError('Произошла неизвестная ошибка');
      }
    }
  };

  return (
    <>
      <CustomModal<IBoardData>
        title="Создать доску"
        isOpen={isModalOpen}
        onClose={onClose}
        onSubmit={handleFormSubmit}
        cancelText="Отмена"
        okText="Добавить">
        <CustomFormInput name="name" type="text" placeholder="Введите название доски" />
      </CustomModal>
    </>
  );
};
