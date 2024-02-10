import { z } from 'zod';

const postCodeRegExp =
  /^[A-Za-z]{1,2}\d[A-Za-z\d]? \d[A-Za-z]{2}$|^\d{5}$|^[A-Za-z]{1,2}\d{1,2} \d[A-Za-z]{2}$/;

export const itemSchema = z
  .array(
    z.object({
      name: z.string().trim().min(1, { message: 'can`t be empty' }),
      quantity: z.coerce.number({ required_error: 'can`t be empty' }).positive().int(),
      price: z.coerce.number({ required_error: 'can`t be empty' }).positive(),
      total: z.coerce.number().positive(),
    })
  )
  .refine((data) => data.length >= 1, { path: ['items'], message: 'an item must be added' });

export const addressSchema = z.object({
  street: z.string().trim().min(1, { message: 'can`t be empty' }),
  city: z.string().trim().min(1, { message: 'can`t be empty' }),
  postCode: z.string().regex(new RegExp(postCodeRegExp), { message: 'invalid code' }),
  country: z.string().trim().min(1, { message: 'can`t be empty' }),
});

export const invoiceSchema = z.object({
  id: z.string().trim().length(6),
  createdAt: z.string(),
  paymentDue: z.coerce.date(),
  description: z.string().trim().min(10, { message: 'must be at least 10 characters long' }),
  paymentTerms: z.coerce.number(),
  clientName: z.string().trim().min(1, { message: 'can`t be empty' }),
  clientEmail: z.string().email({ message: 'invalid email' }),
  status: z.literal('draft').or(z.literal('pending')).or(z.literal('paid')),
  senderAddress: addressSchema,
  clientAddress: addressSchema,
  items: itemSchema,
  total: z.number().positive(),
});

export type Invoice = z.infer<typeof invoiceSchema>;
export type Address = z.infer<typeof addressSchema>;
export type Item = z.infer<typeof itemSchema>;
