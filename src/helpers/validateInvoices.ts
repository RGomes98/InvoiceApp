import { invoiceSchema } from '../lib/schemas/invoice.schema';
import { z } from 'zod';

export const validateInvoices = () => {
  const currentInvoices = JSON.parse(localStorage.getItem('invoices') || String(null));
  const validInvoices = z.array(invoiceSchema).safeParse(currentInvoices);

  if (!validInvoices.success) return localStorage.setItem('invoices', String(null));
  return validInvoices.data;
};
