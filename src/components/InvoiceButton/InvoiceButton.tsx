import { useInvoiceContext } from '../../hooks/useInvoiceContext';

import PlusIcon from '../../assets/icons/icon-plus.svg?react';
import styles from './InvoiceButton.module.scss';

export const InvoiceButton = () => {
  const { setIsInvoiceFormActive, setIsInvoiceBeingCreated, setActiveInvoiceId } = useInvoiceContext();

  const handleCreateInvoice = () => {
    setActiveInvoiceId('');
    setIsInvoiceFormActive(true);
    setIsInvoiceBeingCreated(true);
  };

  return (
    <button onClick={handleCreateInvoice} className={styles.newInvoiceButton}>
      <div className={styles.iconWrapper}>
        <PlusIcon className={styles.plusIcon} />
      </div>
      <span className={styles.text}>New Invoice</span>
      <span className={styles.text}>New</span>
    </button>
  );
};
