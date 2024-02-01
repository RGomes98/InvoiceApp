import type { ReactNode, SetStateAction, Dispatch } from 'react';
import { validateInvoices } from '../helpers/validateInvoices';
import type { Invoice } from '../lib/schemas/invoice.schema';
import { createContext, useState } from 'react';

export type FilterOptions = undefined | 'draft' | 'pending' | 'paid';

type InvoiceContext = {
  invoices: Invoice[] | null;
  setInvoices: Dispatch<SetStateAction<Invoice[] | null>>;
  isDropdownActive: boolean;
  setIsDropdownActive: Dispatch<SetStateAction<boolean>>;
  activeFilter: FilterOptions;
  setActiveFilter: Dispatch<SetStateAction<FilterOptions>>;
};

export const InvoiceContext = createContext<InvoiceContext | null>(null);

const currentInvoices = validateInvoices() || null;

export const InvoiceContextProvider = ({ children }: { children: ReactNode }) => {
  const [invoices, setInvoices] = useState<Invoice[] | null>(currentInvoices);
  const [activeFilter, setActiveFilter] = useState<FilterOptions>(undefined);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  return (
    <InvoiceContext.Provider
      value={{ invoices, setInvoices, isDropdownActive, setIsDropdownActive, activeFilter, setActiveFilter }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
