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
  activeInvoiceId: string;
  setActiveInvoiceId: Dispatch<SetStateAction<string>>;
  isInvoiceMenuActive: boolean;
  setIsInvoiceMenuActive: Dispatch<SetStateAction<boolean>>;
  isInvoiceFormActive: boolean;
  setIsInvoiceFormActive: Dispatch<SetStateAction<boolean>>;
  isInvoiceBeingCreated: boolean;
  setIsInvoiceBeingCreated: Dispatch<SetStateAction<boolean>>;
};

export const InvoiceContext = createContext<InvoiceContext | null>(null);

const currentInvoices = validateInvoices() || null;

export const InvoiceContextProvider = ({ children }: { children: ReactNode }) => {
  const [invoices, setInvoices] = useState<Invoice[] | null>(currentInvoices);
  const [activeFilter, setActiveFilter] = useState<FilterOptions>(undefined);
  const [isInvoiceBeingCreated, setIsInvoiceBeingCreated] = useState(false);
  const [isInvoiceMenuActive, setIsInvoiceMenuActive] = useState(false);
  const [isInvoiceFormActive, setIsInvoiceFormActive] = useState(false);
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
        isInvoiceFormActive,
        setIsInvoiceFormActive,
        isInvoiceBeingCreated,
        setIsInvoiceBeingCreated,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
