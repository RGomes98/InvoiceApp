import { type GetZodParseErrors, getZodParseErrors } from '../helpers/getZodParseErrors';
import { type Invoice, invoiceSchema, itemSchema } from '../lib/schemas/invoice.schema';
import { type UseFormRegister, type FieldErrors, useForm } from 'react-hook-form';
import { type ChangeEvent, useState, useEffect, useCallback } from 'react';
import { generateInvoiceId } from '../utils/generateInvoiceId';
import { useInvoiceActions } from './useInvoiceActions';
import { useInvoiceContext } from './useInvoiceContext';
import { formatToDateTime } from '../utils/formatDate';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

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
    formState: { errors, isSubmitted, isSubmitting, isSubmitSuccessful },
  } = useForm<Invoice>({
    resolver: zodResolver(invoiceSchema.omit({ paymentDue: true, total: true, items: true })),
  });

  const handleDiscardInvoice = () => {
    reset();
    resetInvoiceItems();
    setIsInvoiceFormActive(false);
    setInvoiceItemsErrors(undefined);
  };

  const validateInvoiceItems = (items: Invoice['items'][number][]) => {
    const parsedItems = itemSchema.safeParse(items);

    if (!parsedItems.success) {
      const { issues } = parsedItems.error;
      return setInvoiceItemsErrors(getZodParseErrors(issues));
    }

    setInvoiceItemsErrors(undefined);
    return parsedItems.data;
  };

  const sendFormErrorToast = () =>
    toast.error('Failed to submit form. Ensure all fields are properly filled and try once more.');

  const onSubmit = (formData: Invoice) => {
    const data = validateInvoiceItems(invoiceItems);
    if (!data) return sendFormErrorToast();

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

  const getItemTotalPrice = (item: Invoice['items'][number]) => {
    const { price, quantity } = item;
    return price * quantity;
  };

  const handleAddInvoiceItem = () => {
    setInvoiceItems((prev) => {
      prev = [...prev, { name: '', quantity: 0, price: 0, total: 0 }];
      validateInvoiceItems(prev);
      return prev;
    });
  };

  const handleDeleteInvoiceItem = (index: number) => {
    setInvoiceItems((prev) => {
      const invoiceItems = structuredClone(prev);
      invoiceItems.splice(index, 1);
      validateInvoiceItems(prev);
      return invoiceItems;
    });
  };

  const handleUpdateItemValue = (event: ChangeEvent<HTMLInputElement>) => {
    const [id, name] = event.target.id.split('-');
    const { value } = event.target;

    setInvoiceItems((prev) => {
      let currentItem = prev[Number(id)];
      currentItem = { ...currentItem, [name]: value };
      currentItem.total = getItemTotalPrice(currentItem);
      prev[Number(id)] = currentItem;
      validateInvoiceItems(prev);
      return [...prev];
    });
  };

  useEffect(() => {
    resetInvoiceItems();
    resetInvoiceValues();
  }, [isInvoiceFormActive, resetInvoiceItems, resetInvoiceValues]);

  useEffect(() => {
    if (!isSubmitting && isSubmitted && !isSubmitSuccessful) sendFormErrorToast();
  }, [isSubmitting, isSubmitted, isSubmitSuccessful]);

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
