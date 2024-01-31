import type { Invoice } from '../lib/schemas/invoice.schema';

export const fetchData = async (): Promise<Invoice[]> => {
  try {
    const response = await fetch('/data/invoices.json');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
