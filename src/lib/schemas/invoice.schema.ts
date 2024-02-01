import { z } from 'zod';

export const itemSchema = z.object({
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
  total: z.number(),
});

export const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  postCode: z.string(),
  country: z.string(),
});

export const invoiceSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  paymentDue: z.coerce.date(),
  description: z.string(),
  paymentTerms: z.number(),
  clientName: z.string(),
  clientEmail: z.string(),
  status: z.string(),
  senderAddress: addressSchema,
  clientAddress: addressSchema,
  items: z.array(itemSchema),
  total: z.number(),
});

export const invoicesSchema = z.array(invoiceSchema);

export type Invoices = z.infer<typeof invoicesSchema>;
export type Invoice = z.infer<typeof invoiceSchema>;
export type Address = z.infer<typeof addressSchema>;
export type Item = z.infer<typeof itemSchema>;
