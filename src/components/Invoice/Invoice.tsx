import type { Invoice as InvoiceType } from '../../lib/schemas/invoice.schema';
import { useThemeContext } from '../../hooks/useThemeContext';
import { formatCurrency } from '../../utils/FormatCurrency';
import { formatDate } from '../../utils/formatDate';

import ArrowLeftIcon from '../../assets/icons/icon-arrow-right.svg?react';
import styles from './Invoice.module.scss';

type Invoice = Pick<InvoiceType, 'id' | 'paymentDue' | 'clientName' | 'total' | 'status'>;

export const Invoice = ({ id, paymentDue, clientName, total, status }: Invoice) => {
  const { activeTheme } = useThemeContext();

  return (
    <li className={`${styles.container} ${styles[activeTheme]}`}>
      <button className={styles.button}>
        <div className={styles.clientWrapper}>
          <span className={styles.id}>
            <span className={styles.hashtag}>#</span>
            {id}
          </span>
          <span className={styles.dueDate}>
            <span className={styles.variant}>Due</span> {formatDate(new Date(paymentDue))}
          </span>
          <span className={styles.clientName}>{clientName}</span>
        </div>
        <div className={styles.totalWrapper}>
          <span className={styles.total}>{formatCurrency(total)}</span>
          <div className={`${styles.statusWrapper} ${styles[`transparent-${status}`]}`}>
            <span className={`${styles.dot} ${styles[`solid-${status}`]}`} />
            <span className={`${styles.status} ${styles[`color-${status}`]}`}>{status}</span>
          </div>
          <ArrowLeftIcon className={styles.icon} />
        </div>
      </button>
    </li>
  );
};
