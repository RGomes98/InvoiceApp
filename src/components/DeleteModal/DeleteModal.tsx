import { getActiveThemeStyles } from '../../utils/getActiveThemeStyles';
import { useInvoiceActions } from '../../hooks/useInvoiceActions';
import { useInvoiceContext } from '../../hooks/useInvoiceContext';
import { useThemeContext } from '../../hooks/useThemeContext';
import type { RefObject } from 'react';

import styles from './DeleteModal.module.scss';

type DeleteModal = {
  invoiceId: string;
  handleCloseModal: () => void;
  modalRef: RefObject<HTMLDialogElement>;
};

export const DeleteModal = ({ modalRef, handleCloseModal, invoiceId }: DeleteModal) => {
  const { setIsInvoiceMenuActive } = useInvoiceContext();
  const { deleteInvoice } = useInvoiceActions();
  const { activeTheme } = useThemeContext();

  return (
    <dialog className={`${styles.modal} ${getActiveThemeStyles(styles[activeTheme])}`} ref={modalRef}>
      <div className={styles.message}>
        <span className={styles.heading}>Confirm Deletion</span>
        <p className={styles.text}>
          Are you sure you want to delete invoice #{invoiceId}? This action cannot be undone.
        </p>
        <div className={styles.buttonWrapper}>
          <button className={styles.cancel} onClick={handleCloseModal}>
            Cancel
          </button>
          <button
            className={styles.delete}
            onClick={() => {
              deleteInvoice(invoiceId);
              setIsInvoiceMenuActive(false);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};
