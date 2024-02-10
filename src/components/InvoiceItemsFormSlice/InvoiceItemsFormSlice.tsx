import type { InvoiceItemsFormSlice as InvoiceItemsFormSliceType } from '../../hooks/useInvoiceForm';
import { getActiveThemeStyles } from '../../utils/getActiveThemeStyles';
import { getFormErrorStyles } from '../../utils/getFormErrorStyles';
import { formatNumberInput } from '../../utils/formatNumberInput';
import { formatToCurrency } from '../../utils/formatToCurrency';
import { useThemeContext } from '../../hooks/useThemeContext';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { ChangeEvent } from 'react';

import DeleteIcon from '../../assets/icons/icon-delete.svg?react';
import styles from './InvoiceItemsFormSlice.module.scss';

export const InvoiceItemsFormSlice = ({
  invoiceItems,
  invoiceItemsErrors,
  handleAddInvoiceItem,
  handleUpdateItemValue,
  handleDeleteInvoiceItem,
}: InvoiceItemsFormSliceType) => {
  const handleNumberInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value = formatNumberInput(event.target.value);
    handleUpdateItemValue(event);
  };

  const { activeTheme } = useThemeContext();

  return (
    <div className={`${styles.container} ${getActiveThemeStyles(styles[activeTheme])}`}>
      <div className={styles.headingWrapper}>
        <span className={styles.heading}>Item List</span>
        <ul className={styles.productDescriptionList}>
          <li className={styles.productDescriptionItem}>Item Name</li>
          <li className={styles.productDescriptionItem}>Qty.</li>
          <li className={styles.productDescriptionItem}>Price</li>
          <li className={styles.productDescriptionItem}>Total</li>
        </ul>
      </div>
      <ul className={styles.productList}>
        {invoiceItems.map(({ name, price, quantity, total }, index) => {
          const errors = invoiceItemsErrors?.[`${index}`];

          return (
            <li className={styles.productItem} key={index}>
              <div className={styles.itemWrapper}>
                <span className={styles.mobileDescription}>Item Name</span>
                <input
                  className={`${styles.productName} ${getFormErrorStyles(styles.inputError, errors?.name)}`}
                  type='text'
                  value={name}
                  inputMode='numeric'
                  id={`${index}-name`}
                  onChange={handleUpdateItemValue}
                />
              </div>
              <div className={styles.itemWrapper}>
                <span className={styles.mobileDescription}>Qty.</span>
                <input
                  className={`${styles.productQuantity} ${getFormErrorStyles(
                    styles.inputError,
                    errors?.quantity
                  )}`}
                  type='text'
                  value={quantity}
                  inputMode='numeric'
                  id={`${index}-quantity`}
                  onChange={handleNumberInput}
                />
              </div>
              <div className={styles.itemWrapper}>
                <span className={styles.mobileDescription}>Price</span>
                <input
                  className={`${styles.productPrice} ${getFormErrorStyles(styles.inputError, errors?.price)}`}
                  type='text'
                  value={price}
                  inputMode='numeric'
                  id={`${index}-price`}
                  onChange={handleNumberInput}
                />
              </div>
              <div className={styles.itemWrapper}>
                <span className={styles.mobileDescription}>Total</span>
                <input className={styles.productTotal} readOnly value={formatToCurrency(total)} />
              </div>
              <button
                className={styles.removeButton}
                type='button'
                onClick={() => handleDeleteInvoiceItem(index)}
              >
                <DeleteIcon />
              </button>
            </li>
          );
        })}
      </ul>

      <div className={styles.addWrapper}>
        <button className={styles.addButton} type='button' onClick={handleAddInvoiceItem}>
          + Add New Item
        </button>
        <ErrorMessage error={invoiceItemsErrors?.items?.itemsError} />
      </div>
    </div>
  );
};
