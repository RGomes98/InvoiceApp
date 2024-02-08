import { useRef } from 'react';

export const useDeleteModal = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleShowModal = () => modalRef.current?.showModal();
  const handleCloseModal = () => modalRef.current?.close();

  return { modalRef, handleShowModal, handleCloseModal };
};
