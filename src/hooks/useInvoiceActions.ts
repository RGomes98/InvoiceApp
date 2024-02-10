import type { Invoice, Item } from '../lib/schemas/invoice.schema';
import { useInvoiceContext } from './useInvoiceContext';
import { formatToDateTime } from '../utils/formatDate';
import { getFutureDate } from '../utils/getFutureDate';

type CreateInvoice = Omit<Invoice, 'total' | 'paymentDue'>;
type UpdateInvoice = Omit<CreateInvoice, 'status'>;

export const useInvoiceActions = () => {
  const { invoices, setInvoices } = useInvoiceContext();

  const updateInvoices = (invoicesToUpdate: Invoice[]) => {
    setInvoices(invoicesToUpdate);
    localStorage.setItem('invoices', JSON.stringify(invoicesToUpdate));
  };

  const getInvoiceItemsTotal = (items: Item) => {
    return items?.reduce((total, { quantity, price }) => (total += quantity * price), 0);
  };

  const createInvoice = (invoice: CreateInvoice) => {
    if (!invoices) return;
    const currentDate = new Date(invoice.createdAt);

    const newInvoice = {
      ...invoice,
      id: invoice.id,
      paymentTerms: invoice.paymentTerms,
      createdAt: formatToDateTime(currentDate),
      total: getInvoiceItemsTotal(invoice.items),
      paymentDue: getFutureDate(currentDate, invoice.paymentTerms),
    };

    updateInvoices([...invoices, newInvoice]);
  };

  const updateInvoice = (invoiceId: string, updatedInvoice: UpdateInvoice) => {
    const invoiceToUpdate = invoices?.find(({ id }) => id === invoiceId);

    if (!invoices || !invoiceToUpdate) return;

    const invoice = {
      ...updatedInvoice,
      id: invoiceToUpdate.id,
      status: invoiceToUpdate.status,
      createdAt: updatedInvoice.createdAt,
      paymentTerms: updatedInvoice.paymentTerms,
      total: getInvoiceItemsTotal(updatedInvoice.items),
      paymentDue: getFutureDate(new Date(updatedInvoice.createdAt), updatedInvoice.paymentTerms),
    };

    updateInvoices([...invoices.filter(({ id }) => id !== invoiceId), invoice]);
  };

  const deleteInvoice = (invoiceId: string) => {
    if (!invoices) return;
    updateInvoices([...invoices.filter(({ id }) => id !== invoiceId)]);
  };

  const markInvoiceAsPaid = (invoiceId: string) => {
    const invoiceToUpdate = invoices?.find(({ id }) => id === invoiceId);
    if (!invoices || !invoiceToUpdate) return;

    invoiceToUpdate.status = 'paid';
    updateInvoices([...invoices.filter(({ id }) => id !== invoiceId), invoiceToUpdate]);
  };

  return { createInvoice, updateInvoice, deleteInvoice, markInvoiceAsPaid };
};
