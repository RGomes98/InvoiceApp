import { useInvoiceContext } from '../../hooks/useInvoiceContext';
import { EmptyInvoices } from '../EmptyInvoices/EmptyInvoices';
import { useInvoice } from '../../hooks/useInvoices';
import { Invoice } from '../Invoice/Invoice';

import styles from './Invoices.module.scss';

export const Invoices = () => {
  const { activeFilter } = useInvoiceContext();
  const { invoices } = useInvoice();

  if (invoices?.length === 0) return <EmptyInvoices />;
  const filteredInvoices = invoices?.filter(({ status }) => status === (activeFilter || status));

  return (
    <ul className={styles.container}>
      {filteredInvoices?.map(({ id, paymentDue, clientName, total, status }) => (
        <Invoice key={id} {...{ id, paymentDue, clientName, total, status }} />
      ))}
    </ul>
  );
};
