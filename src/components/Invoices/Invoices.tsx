import { useInvoiceContext } from '../../hooks/useInvoiceContext';
import { useInvoicesFetch } from '../../hooks/useInvoicesFetch';
import { EmptyInvoices } from '../EmptyInvoices/EmptyInvoices';
import { Heading } from '../Heading/Heading';
import { Invoice } from '../Invoice/Invoice';

import styles from './Invoices.module.scss';

export const Invoices = () => {
  const { activeFilter } = useInvoiceContext();
  const { invoices } = useInvoicesFetch();

  if (!invoices) return null;
  const filteredInvoices = invoices?.filter(({ status }) => status === (activeFilter || status));

  return (
    <div className={styles.container}>
      <Heading />
      {invoices.length > 0 ? (
        <ul className={styles.invoiceList}>
          {filteredInvoices?.map(({ id, paymentDue, clientName, total, status }) => (
            <Invoice key={id} {...{ id, paymentDue, clientName, total, status }} />
          ))}
        </ul>
      ) : (
        <EmptyInvoices />
      )}
    </div>
  );
};
