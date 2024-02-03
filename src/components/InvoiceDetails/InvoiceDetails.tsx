import { getActiveThemeStyles } from '../../utils/getActiveThemeStyles';
import { InvoiceProducts } from '../InvoiceProducts/InvoiceProducts';
import { InvoiceActions } from '../InvoiceActions/InvoiceActions';
import { useInvoiceContext } from '../../hooks/useInvoiceContext';
import { ActionsButtons } from '../ActionsButtons/ActionsButtons';
import { InvoiceSender } from '../InvoiceSender/InvoiceSender';
import { InvoiceClient } from '../InvoiceClient/InvoiceClient';
import { useThemeContext } from '../../hooks/useThemeContext';
import { BackButton } from '../BackButton/BackButton';

import styles from './InvoiceDetails.module.scss';

export const InvoiceDetails = () => {
  const { invoices, activeInvoiceId, isInvoiceMenuActive } = useInvoiceContext();
  const { activeTheme } = useThemeContext();

  const invoice = invoices?.find(({ id }) => id === activeInvoiceId);
  if (!invoice) return null;

  return (
    <div
      className={`${styles.container} ${getActiveThemeStyles(styles[activeTheme])} ${
        (isInvoiceMenuActive && styles.showInvoice) || ''
      }`}
    >
      <BackButton />
      <InvoiceActions invoiceStatus={invoice.status} />
      <div className={styles.detailsWrapper}>
        <InvoiceSender {...{ invoice }} />
        <InvoiceClient {...{ invoice }} />
        <InvoiceProducts {...{ invoice }} />
      </div>
      <div className={styles.actionsButtons}>
        <ActionsButtons />
      </div>
    </div>
  );
};
