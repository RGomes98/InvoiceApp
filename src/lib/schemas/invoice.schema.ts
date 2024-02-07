import { getDaysDifference } from '../../utils/getDaysDifference';
import { z } from 'zod';

const postCodeRegExp =
  /^[A-Za-z]{1,2}\d[A-Za-z\d]? \d[A-Za-z]{2}$|^\d{5}$|^[A-Za-z]{1,2}\d{1,2} \d[A-Za-z]{2}$/;

export const itemSchema = z.object({
  name: z.string().trim().min(1),
  quantity: z.number().positive().int(),
  price: z.number().nonnegative(),
  total: z.number().nonnegative(),
});

export const addressSchema = z.object({
  street: z.string().trim().min(1),
  city: z.string().trim().min(1),
  postCode: z.string().regex(new RegExp(postCodeRegExp)),
  country: z.string().trim().min(1),
});

export const invoiceSchema = z
  .object({
    id: z.string().trim().length(6),
    createdAt: z.coerce.date(),
    paymentDue: z.coerce.date(),
    description: z.string().trim().min(10),
    paymentTerms: z.number().positive().int(),
    clientName: z.string().trim().min(1),
    clientEmail: z.string().email(),
    status: z.literal('draft').or(z.literal('pending')).or(z.literal('paid')),
    senderAddress: addressSchema,
    clientAddress: addressSchema,
    items: z.array(itemSchema).nonempty(),
    total: z.number().nonnegative(),
  })
  .superRefine(({ createdAt, paymentDue }, refinementContext) => {
    if (getDaysDifference(createdAt, paymentDue) <= 0) {
      refinementContext.addIssue({
        message: "Payment due date must be at least 1 day later than today's date.",
        code: z.ZodIssueCode.custom,
        path: ['paymentDue'],
      });
    }
  });

export type Invoice = z.infer<typeof invoiceSchema>;
export type Address = z.infer<typeof addressSchema>;
export type Item = z.infer<typeof itemSchema>;
