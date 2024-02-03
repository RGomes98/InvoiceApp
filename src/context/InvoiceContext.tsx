import type { ReactNode, SetStateAction, Dispatch } from 'react';
import { validateInvoices } from '../helpers/validateInvoices';
import type { Invoices } from '../lib/schemas/invoice.schema';
import { createContext, useState } from 'react';

export type FilterOptions = undefined | 'draft' | 'pending' | 'paid';

type InvoiceContext = {
  invoices: Invoices | null;
  setInvoices: Dispatch<SetStateAction<Invoices | null>>;
  isDropdownActive: boolean;
  setIsDropdownActive: Dispatch<SetStateAction<boolean>>;
  activeFilter: FilterOptions;
  setActiveFilter: Dispatch<SetStateAction<FilterOptions>>;
  activeInvoiceId: string;
  setActiveInvoiceId: Dispatch<SetStateAction<string>>;
  isInvoiceMenuActive: boolean;
  setIsInvoiceMenuActive: Dispatch<SetStateAction<boolean>>;
};

export const InvoiceContext = createContext<InvoiceContext | null>(null);

const currentInvoices = validateInvoices() || null;

export const InvoiceContextProvider = ({ children }: { children: ReactNode }) => {
  const [invoices, setInvoices] = useState<Invoices | null>(currentInvoices);
  const [activeFilter, setActiveFilter] = useState<FilterOptions>(undefined);
  const [isInvoiceMenuActive, setIsInvoiceMenuActive] = useState(false);
  const [activeInvoiceId, setActiveInvoiceId] = useState<string>('');
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        setInvoices,
        isDropdownActive,
        setIsDropdownActive,
        activeFilter,
        setActiveFilter,
        activeInvoiceId,
        setActiveInvoiceId,
        isInvoiceMenuActive,
        setIsInvoiceMenuActive,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
