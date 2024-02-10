import { getActiveThemeStyles } from '../../utils/getActiveThemeStyles';
import { getFormErrorStyles } from '../../utils/getFormErrorStyles';
import { useThemeContext } from '../../hooks/useThemeContext';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { FormSlice } from '../../hooks/useInvoiceForm';

import styles from './InvoiceDetailsFormSlice.module.scss';

export const InvoiceDetailsFormSlice = ({ register, errors }: FormSlice) => {
  const { activeTheme } = useThemeContext();
  const options = [1, 7, 14, 30];
  const { description, createdAt } = errors;

  return (
    <div className={`${styles.detailsWrapper} ${getActiveThemeStyles(styles[activeTheme])}`}>
      <div className={styles.dateWrapper}>
        <div className={styles.inputWrapper}>
          <div className={styles.labelWrapper}>
            <label
              className={`${styles.label} ${getFormErrorStyles(styles.labelError, createdAt?.message)}`}
              htmlFor='invoiceDate'
            >
              Invoice Date
            </label>
            <ErrorMessage error={createdAt?.message} />
          </div>
          <input
            className={`${styles.dateInput} ${getFormErrorStyles(styles.inputError, createdAt?.message)}`}
            id='invoiceDate'
            type='date'
            {...register('createdAt')}
          />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.labelWrapper}>
            <label className={styles.label} htmlFor='paymentTerms'>
              Payment Terms
            </label>
          </div>
          <select className={styles.select} id='paymentTerms' {...register('paymentTerms')}>
            {options.map((option) => {
              const optionText = option === 1 ? 'day' : 'days';

              return (
                <option className={styles.option} key={option} value={option}>
                  Net {option} {optionText}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className={styles.inputWrapper}>
        <div className={styles.labelWrapper}>
          <label
            className={`${styles.label} ${getFormErrorStyles(styles.labelError, description?.message)}`}
            htmlFor='projectDescription'
          >
            Project Description
          </label>
          <ErrorMessage error={description?.message} />
        </div>
        <input
          className={`${styles.input} ${getFormErrorStyles(styles.inputError, description?.message)}`}
          id='projectDescription'
          type='text'
          {...register('description')}
        />
      </div>
    </div>
  );
};
