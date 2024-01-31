import type { ReactNode, SetStateAction, Dispatch } from 'react';
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

const localStorageInvoices = window.localStorage.getItem('invoices') || String(null);

export const InvoiceContext = createContext<InvoiceContext | null>(null);

export const InvoiceContextProvider = ({ children }: { children: ReactNode }) => {
  const [invoices, setInvoices] = useState<Invoice[] | null>(JSON.parse(localStorageInvoices));
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
