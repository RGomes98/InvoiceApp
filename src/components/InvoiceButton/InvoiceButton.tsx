import PlusIcon from '../../assets/icons/icon-plus.svg?react';
import styles from './InvoiceButton.module.scss';

export const InvoiceButton = () => {
  return (
    <button className={styles.newInvoiceButton}>
      <div className={styles.iconWrapper}>
        <PlusIcon className={styles.plusIcon} />
      </div>
      <span className={styles.text}>New Invoice</span>
      <span className={styles.text}>New</span>
    </button>
  );
};
