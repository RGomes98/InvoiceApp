import { useInvoiceContext } from '../../hooks/useInvoiceContext';
import { EmptyInvoices } from '../EmptyInvoices/EmptyInvoices';
import { useInvoices } from '../../hooks/useInvoices';
import { Heading } from '../Heading/Heading';
import { Invoice } from '../Invoice/Invoice';

import styles from './Invoices.module.scss';

export const Invoices = () => {
  const { activeFilter } = useInvoiceContext();
  const { invoices } = useInvoices();

  if (invoices?.length === 0) return <EmptyInvoices />;
  const filteredInvoices = invoices?.filter(({ status }) => status === (activeFilter || status));

  return (
    <div className={styles.container}>
      <Heading />
      <ul className={styles.invoiceList}>
        {filteredInvoices?.map(({ id, paymentDue, clientName, total, status }) => (
          <Invoice key={id} {...{ id, paymentDue, clientName, total, status }} />
        ))}
      </ul>
    </div>
  );
};
