import { invoicesSchema } from '../lib/schemas/invoice.schema';

export const validateInvoices = () => {
  const currentInvoices = JSON.parse(localStorage.getItem('invoices') || String(null));
  const validInvoices = invoicesSchema.safeParse(currentInvoices);

  if (!validInvoices.success) return localStorage.setItem('invoices', String(null));
  return validInvoices.data;
};
