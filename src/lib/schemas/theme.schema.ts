import { z } from 'zod';

export const themeSchema = z.literal('light').or(z.literal('dark'));

export type Theme = z.infer<typeof themeSchema>;
