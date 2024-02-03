import { getActiveThemeStyles } from '../../utils/getActiveThemeStyles';
import type { Invoice } from '../../lib/schemas/invoice.schema';
import { useThemeContext } from '../../hooks/useThemeContext';
import { formatDate } from '../../utils/formatDate';

import styles from './InvoiceClient.module.scss';

export const InvoiceClient = ({ invoice }: { invoice: Invoice }) => {
  const { activeTheme } = useThemeContext();

  return (
    <ul className={`${styles.clientList} ${getActiveThemeStyles(styles[activeTheme])}`}>
      <li className={styles.clientItem}>
        <div className={styles.invoiceDate}>
          <span className={styles.dateHeading}>Invoice Date</span>
          <span className={styles.date}>{formatDate(invoice.createdAt)}</span>
        </div>
        <div className={styles.invoicePayment}>
          <span className={styles.paymentHeading}>Payment Due</span>
          <span className={styles.date}>{formatDate(invoice.paymentDue)}</span>
        </div>
      </li>
      <li className={styles.clientItem}>
        <span className={styles.clientHeading}>Bill To</span>
        <div className={styles.clientWrapper}>
          <span className={styles.clientName}>{invoice.clientName}</span>
          <span className={styles.clientAddress}>{invoice.clientAddress.street}</span>
          <span className={styles.clientAddress}>{invoice.clientAddress.city}</span>
          <span className={styles.clientAddress}>{invoice.clientAddress.postCode}</span>
          <span className={styles.clientAddress}>{invoice.clientAddress.country}</span>
        </div>
      </li>
      <li className={styles.clientItem}>
        <span className={styles.sentHeading}>Sent To</span>
        <span className={styles.clientEmail}>{invoice.clientEmail}</span>
      </li>
    </ul>
  );
};
