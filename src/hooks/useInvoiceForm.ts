import { type GetZodParseErrors, getZodParseErrors } from '../helpers/getZodParseErrors';
import { type Invoice, invoiceSchema, itemSchema } from '../lib/schemas/invoice.schema';
import { type UseFormRegister, type FieldErrors, useForm } from 'react-hook-form';
import { type ChangeEvent, useState, useEffect, useCallback } from 'react';
import { generateInvoiceId } from '../utils/generateInvoiceId';
import { useInvoiceActions } from './useInvoiceActions';
import { useInvoiceContext } from './useInvoiceContext';
import { formatToDateTime } from '../utils/formatDate';
import { zodResolver } from '@hookform/resolvers/zod';

export type FormSlice = { register: UseFormRegister<Invoice>; errors: FieldErrors<Invoice> };

export type InvoiceItemsFormSlice = {
  handleAddInvoiceItem: () => void;
  invoiceItems: Invoice['items'] | [];
  handleDeleteInvoiceItem: (index: number) => void;
  invoiceItemsErrors: GetZodParseErrors | undefined;
  handleUpdateItemValue: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const useInvoiceForm = (isInvoiceBeingCreated: boolean) => {
  const { invoices, activeInvoiceId, isInvoiceFormActive, setIsInvoiceFormActive } = useInvoiceContext();
  const { createInvoice, updateInvoice } = useInvoiceActions();

  const invoice = invoices?.find(({ id }) => id === activeInvoiceId);
  const isInvoiceBeingEdited = !isInvoiceBeingCreated && invoice !== undefined;

  const [invoiceItemsErrors, setInvoiceItemsErrors] = useState<GetZodParseErrors | undefined>();
  const [invoiceStatus, setInvoiceStatus] = useState<Invoice['status']>('pending');
  const [invoiceItems, setInvoiceItems] = useState<Invoice['items'] | []>([]);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Invoice>({
    resolver: zodResolver(invoiceSchema.omit({ paymentDue: true, total: true, items: true })),
  });

  const handleDiscardInvoice = () => {
    reset();
    resetInvoiceItems();
    setIsInvoiceFormActive(false);
    setInvoiceItemsErrors(undefined);
  };

  const onSubmit = (formData: Invoice) => {
    const parsedItems = itemSchema.safeParse(invoiceItems);

    if (!parsedItems.success) {
      const { issues } = parsedItems.error;
      return setInvoiceItemsErrors(getZodParseErrors(issues));
    }

    const { data } = parsedItems;

    if (isInvoiceBeingEdited) updateInvoice(invoice.id, { ...formData, items: data });
    if (!isInvoiceBeingEdited) createInvoice({ ...formData, status: invoiceStatus, items: data });

    handleDiscardInvoice();
  };

  const resetInvoiceItems = useCallback(() => {
    if (isInvoiceBeingEdited) return setInvoiceItems([...invoice.items]);
    setInvoiceItems([]);
  }, [invoice, isInvoiceBeingEdited]);

  const resetInvoiceValues = useCallback(() => {
    if (isInvoiceBeingEdited)
      return reset({ ...invoice, createdAt: formatToDateTime(new Date(invoice.createdAt)) });

    reset({
      total: 0,
      items: [],
      clientName: '',
      clientEmail: '',
      description: '',
      paymentTerms: 30,
      status: 'pending',
      paymentDue: new Date(),
      id: generateInvoiceId(),
      createdAt: formatToDateTime(new Date()),
      senderAddress: { city: '', country: '', postCode: '', street: '' },
      clientAddress: { city: '', country: '', postCode: '', street: '' },
    });
  }, [reset, invoice, isInvoiceBeingEdited]);

  useEffect(() => {
    resetInvoiceItems();
    resetInvoiceValues();
  }, [isInvoiceFormActive, resetInvoiceItems, resetInvoiceValues]);

  const getItemTotalPrice = (item: Invoice['items'][number]) => {
    const { price, quantity } = item;
    return price * quantity;
  };

  const handleAddInvoiceItem = () => {
    setInvoiceItems((prev) => [...prev, { name: '', quantity: 0, price: 0, total: 0 }]);
  };

  const handleDeleteInvoiceItem = (index: number) => {
    setInvoiceItems((prev) => {
      const invoiceItems = structuredClone(prev);
      invoiceItems.splice(index, 1);
      return invoiceItems;
    });
  };

  const handleUpdateItemValue = (event: ChangeEvent<HTMLInputElement>) => {
    const [id, name] = event.target.id.split('-');
    const { value } = event.target;

    setInvoiceItems((prev) => {
      let currentItem = prev[Number(id)];
      currentItem = { ...currentItem, [name]: value, total: getItemTotalPrice(prev[Number(id)]) };
      prev[Number(id)] = currentItem;
      return [...prev];
    });
  };

  return {
    errors,
    invoiceItems,
    invoiceStatus,
    invoiceItemsErrors,
    register,
    onSubmit,
    handleSubmit,
    handleAddInvoiceItem,
    handleUpdateItemValue,
    handleDeleteInvoiceItem,
    handleDiscardInvoice,
    setInvoiceStatus,
  };
};
