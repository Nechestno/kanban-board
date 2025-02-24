import { Form, Modal } from 'antd';
import { CustomModalProps } from '../model';


export const CustomModal = <T, >({
                                   title,
                                   isOpen,
                                   onClose,
                                   onSubmit,
                                   children,
                                   okText,
                                   cancelText,
                                 }: CustomModalProps<T>) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onClose}
      onOk={form.submit}
      centered
      cancelText={cancelText}
      okText={okText}
    >
      <Form form={form} onFinish={onSubmit}>
        {children}
      </Form>
    </Modal>
  );
};