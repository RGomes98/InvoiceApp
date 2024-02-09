import type { ZodIssue } from 'zod';

export type GetZodParseErrors = Record<
  'items' | `${number}`,
  Record<'itemsError' | 'name' | 'price' | 'quantity', string>
>;

type Index = keyof GetZodParseErrors;

export const getZodParseErrors = (issues: ZodIssue[]) => {
  return issues.reduce((obj, { path, message }) => {
    const [errorIndex, errorPath] = path;
    const index = String(errorIndex);

    obj[index as Index] = { ...obj[index as Index], [String(errorPath || 'itemsError')]: message };
    return obj;
  }, {} as GetZodParseErrors);
};
