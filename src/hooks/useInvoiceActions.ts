import type { Invoice, Item } from '../lib/schemas/invoice.schema';
import { useInvoiceContext } from './useInvoiceContext';
import { formatDate, formatToDateTime } from '../utils/formatDate';
import { getFutureDate } from '../utils/getFutureDate';
import { toast } from 'sonner';

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

    toast.success(`Invoice created successfully!`, {
      duration: 5000,
      description: `Invoice created for ${newInvoice.clientName} - Due on ${formatDate(
        newInvoice.paymentDue
      )}`,
    });
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

    toast.success(`Invoice #${invoice.id} has been updated successfully!`);
    updateInvoices([...invoices.filter(({ id }) => id !== invoiceId), invoice]);
  };

  const deleteInvoice = (invoiceId: string) => {
    if (!invoices) return;
    toast.success(`Invoice #${invoiceId} has been deleted successfully!`);
    updateInvoices([...invoices.filter(({ id }) => id !== invoiceId)]);
  };

  const markInvoiceAsPaid = (invoiceId: string) => {
    const invoiceToUpdate = invoices?.find(({ id }) => id === invoiceId);
    if (!invoices || !invoiceToUpdate) return;

    invoiceToUpdate.status = 'paid';
    toast.success(`Invoice #${invoiceId} has been marked as paid.`);
    updateInvoices([...invoices.filter(({ id }) => id !== invoiceId), invoiceToUpdate]);
  };

  const sendInvoice = (invoiceId: string) => {
    const invoiceToUpdate = invoices?.find(({ id }) => id === invoiceId);
    if (!invoices || !invoiceToUpdate) return;

    invoiceToUpdate.status = 'pending';
    toast.success(`Invoice #${invoiceId} has been sent to ${invoiceToUpdate.clientName}.`);
    updateInvoices([...invoices.filter(({ id }) => id !== invoiceId), invoiceToUpdate]);
  };

  return { createInvoice, updateInvoice, deleteInvoice, markInvoiceAsPaid, sendInvoice };
};
