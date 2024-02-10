import { getActiveThemeStyles } from '../../utils/getActiveThemeStyles';
import { InvoiceProducts } from '../InvoiceProducts/InvoiceProducts';
import { InvoiceActions } from '../InvoiceActions/InvoiceActions';
import { useInvoiceContext } from '../../hooks/useInvoiceContext';
import { ActionsButtons } from '../ActionsButtons/ActionsButtons';
import { InvoiceSender } from '../InvoiceSender/InvoiceSender';
import { InvoiceClient } from '../InvoiceClient/InvoiceClient';
import { useThemeContext } from '../../hooks/useThemeContext';
import { useDeleteModal } from '../../hooks/useDeleteModal';
import { DeleteModal } from '../DeleteModal/DeleteModal';
import { BackButton } from '../BackButton/BackButton';
import { Fragment } from 'react';

import styles from './InvoiceDetails.module.scss';

export const InvoiceDetails = () => {
  const { invoices, activeInvoiceId, isInvoiceMenuActive, setIsInvoiceMenuActive } = useInvoiceContext();
  const { modalRef, handleShowModal, handleCloseModal } = useDeleteModal();
  const { activeTheme } = useThemeContext();

  const invoice = invoices?.find(({ id }) => id === activeInvoiceId);
  if (!invoice) return null;

  return (
    <Fragment>
      <div
        className={`${styles.container} ${getActiveThemeStyles(styles[activeTheme])} ${
          (isInvoiceMenuActive && styles.showInvoice) || ''
        }`}
      >
        <BackButton action={() => setIsInvoiceMenuActive(false)} />
        <InvoiceActions invoiceStatus={invoice.status}>
          <ActionsButtons handleShowModal={handleShowModal} />
        </InvoiceActions>
        <div className={styles.detailsWrapper}>
          <InvoiceSender {...{ invoice }} />
          <InvoiceClient {...{ invoice }} />
          <InvoiceProducts {...{ invoice }} />
        </div>
        <div className={styles.actionsButtons}>
          <ActionsButtons handleShowModal={handleShowModal} />
        </div>
      </div>
      <DeleteModal modalRef={modalRef} invoiceId={invoice.id} handleCloseModal={handleCloseModal} />
    </Fragment>
  );
};
