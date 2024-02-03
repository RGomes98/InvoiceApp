import { getActiveThemeStyles } from '../../utils/getActiveThemeStyles';
import type { Invoice } from '../../lib/schemas/invoice.schema';
import { useThemeContext } from '../../hooks/useThemeContext';

import styles from './InvoiceSender.module.scss';

export const InvoiceSender = ({ invoice }: { invoice: Invoice }) => {
  const { activeTheme } = useThemeContext();

  return (
    <ul className={`${styles.senderList} ${getActiveThemeStyles(styles[activeTheme])}`}>
      <li className={styles.senderItem}>
        <span className={styles.invoiceId}>
          <span className={styles.variant}>#</span>
          {invoice.id}
        </span>
        <span className={styles.invoiceDescription}>{invoice.description}</span>
      </li>
      <li className={styles.senderItem}>
        <span className={styles.senderAddress}>{invoice.senderAddress.street}</span>
        <span className={styles.senderAddress}>{invoice.senderAddress.city}</span>
        <span className={styles.senderAddress}>{invoice.senderAddress.postCode}</span>
        <span className={styles.senderAddress}>{invoice.senderAddress.country}</span>
      </li>
    </ul>
  );
};
