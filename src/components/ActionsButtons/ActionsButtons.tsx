import { getActiveThemeStyles } from '../../utils/getActiveThemeStyles';
import { useInvoiceActions } from '../../hooks/useInvoiceActions';
import { useInvoiceContext } from '../../hooks/useInvoiceContext';
import { useThemeContext } from '../../hooks/useThemeContext';

import styles from './ActionsButtons.module.scss';

export const ActionsButtons = () => {
  const { deleteInvoice, markInvoiceAsPaid } = useInvoiceActions();
  const { invoices, activeInvoiceId } = useInvoiceContext();
  const { activeTheme } = useThemeContext();

  const currentInvoice = invoices?.find(({ id }) => id === activeInvoiceId);
  if (!currentInvoice) return null;

  return (
    <li className={`${styles.actionItem} ${getActiveThemeStyles(styles[activeTheme])}`}>
      {currentInvoice?.status !== 'paid' && <button className={styles.editButton}>Edit</button>}
      <button className={styles.deleteButton} onClick={() => deleteInvoice(currentInvoice.id)}>
        Delete
      </button>
      {currentInvoice?.status === 'pending' && (
        <button onClick={() => markInvoiceAsPaid(currentInvoice.id)} className={styles.paidButton}>
          Mark as Paid
        </button>
      )}
    </li>
  );
};
