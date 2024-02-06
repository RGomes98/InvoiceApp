import type { Invoice, Item } from '../lib/schemas/invoice.schema';
import { getDaysDifference } from '../utils/getDaysDifference';
import { useInvoiceContext } from './useInvoiceContext';

type CreateInvoice = Omit<Invoice, 'id' | 'createdAt' | 'paymentTerms' | 'total'>;
type UpdateInvoice = Omit<CreateInvoice, 'status'>;

export const useInvoiceActions = () => {
  const { invoices, setInvoices } = useInvoiceContext();

  const invoicesToMutate = structuredClone(invoices);

  const updateInvoices = (invoices: Invoice[]) => {
    setInvoices(invoices);
    localStorage.setItem('invoices', JSON.stringify(invoices));
  };

  const generateInvoiceId = () => crypto.randomUUID().slice(0, 6).toUpperCase();

  const getInvoicePaymentTerms = (createdAt: Date, paymentDue: Date) => {
    return getDaysDifference(createdAt, paymentDue);
  };

  const getInvoiceItemsTotal = (items: Item[]) => {
    return items.reduce((total, { quantity, price }) => (total += quantity * price), 0);
  };

  const createInvoice = (invoice: CreateInvoice) => {
    if (!invoicesToMutate) return;
    const currentDate = new Date();

    const newInvoice = {
      ...invoice,
      createdAt: currentDate,
      id: generateInvoiceId(),
      total: getInvoiceItemsTotal(invoice.items),
      paymentTerms: getInvoicePaymentTerms(currentDate, invoice.paymentDue),
    };

    updateInvoices([...invoicesToMutate, newInvoice]);
  };

  const updateInvoice = (invoiceId: string, updatedInvoice: UpdateInvoice) => {
    const invoiceToUpdate = invoicesToMutate?.find(({ id }) => id === invoiceId);
    if (!invoicesToMutate || !invoiceToUpdate) return;

    const invoice = {
      ...updatedInvoice,
      id: invoiceToUpdate.id,
      status: invoiceToUpdate.status,
      createdAt: invoiceToUpdate.createdAt,
      total: getInvoiceItemsTotal(updatedInvoice.items),
      paymentTerms: getInvoicePaymentTerms(invoiceToUpdate.createdAt, updatedInvoice.paymentDue),
    };

    updateInvoices([...invoicesToMutate.filter(({ id }) => id !== invoiceId), invoice]);
  };

  const deleteInvoice = (invoiceId: string) => {
    if (!invoicesToMutate) return;
    updateInvoices([...invoicesToMutate.filter(({ id }) => id !== invoiceId)]);
  };

  const markInvoiceAsPaid = (invoiceId: string) => {
    const invoiceToUpdate = invoicesToMutate?.find(({ id }) => id === invoiceId);
    if (!invoicesToMutate || !invoiceToUpdate) return;

    invoiceToUpdate.status = 'paid';
    updateInvoices([...invoicesToMutate.filter(({ id }) => id !== invoiceId), invoiceToUpdate]);
  };

  return { createInvoice, updateInvoice, deleteInvoice, markInvoiceAsPaid };
};
