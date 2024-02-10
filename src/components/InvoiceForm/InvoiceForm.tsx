import { InvoiceDetailsFormSlice } from '../InvoiceDetailsFormSlice/InvoiceDetailsFormSlice';
import { InvoiceClientFormSlice } from '../InvoiceClientFormSlice/InvoiceClientFormSlice';
import { InvoiceSenderFormSlice } from '../InvoiceSenderFormSlice/InvoiceSenderFormSlice';
import { InvoiceItemsFormSlice } from '../InvoiceItemsFormSlice/InvoiceItemsFormSlice';
import { getActiveThemeStyles } from '../../utils/getActiveThemeStyles';
import { useInvoiceContext } from '../../hooks/useInvoiceContext';
import { useThemeContext } from '../../hooks/useThemeContext';
import { useInvoiceForm } from '../../hooks/useInvoiceForm';
import { BackButton } from '../BackButton/BackButton';
import { Fragment } from 'react';

import styles from './InvoiceForm.module.scss';

export const InvoiceForm = () => {
  const { invoices, activeInvoiceId, isInvoiceFormActive, isInvoiceBeingCreated, setIsInvoiceFormActive } =
    useInvoiceContext();

  const { activeTheme } = useThemeContext();

  const invoice = invoices?.find(({ id }) => id === activeInvoiceId);
  const isInvoiceBeingEdited = !isInvoiceBeingCreated && invoice !== undefined;

  const {
    errors,
    invoiceItems,
    invoiceItemsErrors,
    register,
    onSubmit,
    handleSubmit,
    handleAddInvoiceItem,
    handleUpdateItemValue,
    handleDeleteInvoiceItem,
    handleDiscardInvoice,
    setInvoiceStatus,
  } = useInvoiceForm(isInvoiceBeingCreated);

  return (
    <Fragment>
      <div
        className={`${styles.container} ${getActiveThemeStyles(styles[activeTheme])} ${
          (isInvoiceFormActive && styles.showForm) || ''
        }`}
      >
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} id='hook-form'>
          <div className={styles.backButtonWrapper}>
            <BackButton action={() => setIsInvoiceFormActive(false)} />
          </div>
          {isInvoiceBeingEdited ? (
            <span className={styles.formHeading}>
              Edit <span className={styles.variant}>#</span>
              {invoice?.id}
            </span>
          ) : (
            <span className={styles.formHeading}>New Invoice</span>
          )}
          <input className={styles.id} {...register('id')} />
          <input className={styles.status} {...register('status')} />
          <InvoiceSenderFormSlice {...{ register, errors }} />
          <InvoiceClientFormSlice {...{ register, errors }} />
          <InvoiceDetailsFormSlice {...{ register, errors }} />
          <InvoiceItemsFormSlice
            {...{
              invoiceItems,
              invoiceItemsErrors,
              handleAddInvoiceItem,
              handleUpdateItemValue,
              handleDeleteInvoiceItem,
            }}
          />
        </form>
        <div className={styles.buttonWrapper}>
          {isInvoiceBeingEdited ? (
            <div className={styles.editButtonWrapper}>
              <button className={styles.cancel} onClick={handleDiscardInvoice} type='button'>
                Cancel
              </button>
              <button
                className={styles.save}
                onClick={() => setInvoiceStatus(invoice.status)}
                form='hook-form'
                type='submit'
              >
                Save Changes
              </button>
            </div>
          ) : (
            <div className={styles.createButtonWrapper}>
              <button className={styles.discard} onClick={handleDiscardInvoice} type='button'>
                Discard
              </button>
              <button
                className={styles.saveDraft}
                onClick={() => setInvoiceStatus('draft')}
                form='hook-form'
                type='submit'
              >
                Save as Draft
              </button>
              <button
                className={styles.save}
                onClick={() => setInvoiceStatus('pending')}
                form='hook-form'
                type='submit'
              >
                Save & Send
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={`${styles.overlay} ${(isInvoiceFormActive && styles.showOverlay) || ''}`} />
    </Fragment>
  );
};
