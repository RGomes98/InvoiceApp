import { InvoiceContext } from '../context/InvoiceContext';
import { useContext } from 'react';

export const useInvoiceContext = () => {
  const invoiceContext = useContext(InvoiceContext);

  if (!invoiceContext) throw new Error('Use the Invoice context within its provider.');
  return invoiceContext;
};
