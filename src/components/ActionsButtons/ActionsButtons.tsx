import { getActiveThemeStyles } from '../../utils/getActiveThemeStyles';
import { useInvoiceActions } from '../../hooks/useInvoiceActions';
import { useInvoiceContext } from '../../hooks/useInvoiceContext';
import { useThemeContext } from '../../hooks/useThemeContext';

import styles from './ActionsButtons.module.scss';

export const ActionsButtons = ({ handleShowModal }: { handleShowModal: () => void }) => {
  const { invoices, activeInvoiceId, setIsInvoiceFormActive, setIsInvoiceBeingCreated } = useInvoiceContext();
  const { markInvoiceAsPaid, sendInvoice } = useInvoiceActions();
  const { activeTheme } = useThemeContext();

  const currentInvoice = invoices?.find(({ id }) => id === activeInvoiceId);
  if (!currentInvoice) return null;

  const handleEditButton = () => {
    setIsInvoiceFormActive(true);
    setIsInvoiceBeingCreated(false);
  };

  const handleMarkAsPaid = () => {
    markInvoiceAsPaid(currentInvoice.id);
  };

  const handleSendInvoice = () => {
    sendInvoice(currentInvoice.id);
  };

  return (
    <div className={`${styles.actionItem} ${getActiveThemeStyles(styles[activeTheme])}`}>
      {currentInvoice?.status !== 'paid' && (
        <button className={styles.editButton} onClick={handleEditButton}>
          Edit
        </button>
      )}
      <button className={styles.deleteButton} onClick={handleShowModal}>
        Delete
      </button>
      {currentInvoice?.status === 'draft' && (
        <button onClick={handleSendInvoice} className={styles.paidButton}>
          Send
        </button>
      )}
      {currentInvoice?.status === 'pending' && (
        <button onClick={handleMarkAsPaid} className={styles.paidButton}>
          Mark as Paid
        </button>
      )}
    </div>
  );
};
