import { useInvoiceContext } from './useInvoiceContext';
import { fetchData } from '../utils/fetchData';
import { useEffect } from 'react';

export const useInvoice = () => {
  const { invoices, setInvoices } = useInvoiceContext();

  useEffect(() => {
    if (invoices === null) {
      (async () => {
        const invoices = await fetchData();

        setInvoices(invoices);
        window.localStorage.setItem('invoices', JSON.stringify(invoices));
      })();
    }
  }, [invoices, setInvoices]);

  return { invoices };
};
