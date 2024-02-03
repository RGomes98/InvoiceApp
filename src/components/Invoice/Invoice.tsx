import type { Invoice as InvoiceType } from '../../lib/schemas/invoice.schema';
import { getActiveThemeStyles } from '../../utils/getActiveThemeStyles';
import { useInvoiceContext } from '../../hooks/useInvoiceContext';
import { InvoiceStatus } from '../InvoiceStatus/InvoiceStatus';
import { useThemeContext } from '../../hooks/useThemeContext';
import { formatCurrency } from '../../utils/FormatCurrency';
import { formatDate } from '../../utils/formatDate';

import ArrowLeftIcon from '../../assets/icons/icon-arrow-right.svg?react';
import styles from './Invoice.module.scss';

type Invoice = Pick<InvoiceType, 'id' | 'paymentDue' | 'clientName' | 'total' | 'status'>;

export const Invoice = ({ id, paymentDue, clientName, total, status }: Invoice) => {
  const { setActiveInvoiceId, setIsInvoiceMenuActive } = useInvoiceContext();
  const { activeTheme } = useThemeContext();

  const handleInvoiceSelection = () => {
    setActiveInvoiceId(id);
    setIsInvoiceMenuActive(true);
  };

  return (
    <li className={`${styles.container} ${getActiveThemeStyles(styles[activeTheme])}`}>
      <button className={styles.button} onClick={handleInvoiceSelection}>
        <div className={styles.clientWrapper}>
          <span className={styles.id}>
            <span className={styles.hashtag}>#</span>
            {id}
          </span>
          <span className={styles.dueDate}>
            <span className={styles.variant}>Due</span> {formatDate(paymentDue)}
          </span>
          <span className={styles.clientName}>{clientName}</span>
        </div>
        <div className={styles.totalWrapper}>
          <span className={styles.total}>{formatCurrency(total)}</span>
          <InvoiceStatus {...{ status }} />
          <ArrowLeftIcon className={styles.icon} />
        </div>
      </button>
    </li>
  );
};
