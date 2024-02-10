import { getActiveThemeStyles } from '../../utils/getActiveThemeStyles';
import { getFormErrorStyles } from '../../utils/getFormErrorStyles';
import { useThemeContext } from '../../hooks/useThemeContext';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { FormSlice } from '../../hooks/useInvoiceForm';

import styles from './InvoiceClientFormSlice.module.scss';

export const InvoiceClientFormSlice = ({ register, errors }: FormSlice) => {
  const { clientName, clientEmail, clientAddress } = errors;
  const { activeTheme } = useThemeContext();

  return (
    <div className={`${styles.payerWrapper} ${getActiveThemeStyles(styles[activeTheme])}`}>
      <span className={styles.heading}>Bill To</span>
      <div className={styles.inputWrapper}>
        <div className={styles.labelWrapper}>
          <label
            className={`${styles.label} ${getFormErrorStyles(styles.labelError, clientName?.message)}`}
            htmlFor='clientName'
          >
            Client's Name
          </label>
          <ErrorMessage error={clientName?.message} />
        </div>
        <input
          className={`${styles.input} ${getFormErrorStyles(styles.inputError, clientName?.message)}`}
          id='clientName'
          type='text'
          {...register('clientName')}
        />
      </div>
      <div className={styles.inputWrapper}>
        <div className={styles.labelWrapper}>
          <label
            className={`${styles.label} ${getFormErrorStyles(styles.labelError, clientEmail?.message)}`}
            htmlFor='clientEmail'
          >
            Client's Email
          </label>
          <ErrorMessage error={clientEmail?.message} />
        </div>
        <input
          className={`${styles.input} ${getFormErrorStyles(styles.inputError, clientEmail?.message)}`}
          placeholder='e.g. email@example.com'
          id='clientEmail'
          type='text'
          {...register('clientEmail')}
        />
      </div>
      <div className={styles.inputWrapper}>
        <div className={styles.labelWrapper}>
          <label
            className={`${styles.label} ${getFormErrorStyles(
              styles.labelError,
              clientAddress?.street?.message
            )}`}
            htmlFor='clientStreet'
          >
            Street Address
          </label>
          <ErrorMessage error={clientAddress?.street?.message} />
        </div>
        <input
          className={`${styles.input} ${getFormErrorStyles(
            styles.inputError,
            clientAddress?.street?.message
          )}`}
          id='clientStreet'
          type='text'
          {...register('clientAddress.street')}
        />
      </div>
      <div className={styles.addressWrapper}>
        <div className={styles.inputWrapper}>
          <div className={styles.labelWrapper}>
            <label
              className={`${styles.label} ${getFormErrorStyles(
                styles.labelError,
                clientAddress?.city?.message
              )}`}
              htmlFor='clientCity'
            >
              City
            </label>
            <ErrorMessage error={clientAddress?.city?.message} />
          </div>
          <input
            className={`${styles.input} ${getFormErrorStyles(
              styles.inputError,
              clientAddress?.city?.message
            )}`}
            id='clientCity'
            type='text'
            {...register('clientAddress.city')}
          />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.labelWrapper}>
            <label
              className={`${styles.label} ${getFormErrorStyles(
                styles.labelError,
                clientAddress?.postCode?.message
              )}`}
              htmlFor='clientPostCode'
            >
              Post Code
            </label>
            <ErrorMessage error={clientAddress?.postCode?.message} />
          </div>
          <input
            className={`${styles.input} ${getFormErrorStyles(
              styles.inputError,
              clientAddress?.postCode?.message
            )}`}
            id='clientPostCode'
            placeholder='E1 3EZ'
            type='text'
            {...register('clientAddress.postCode')}
          />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.labelWrapper}>
            <label
              className={`${styles.label} ${getFormErrorStyles(
                styles.labelError,
                clientAddress?.country?.message
              )}`}
              htmlFor='clientCountry'
            >
              Country
            </label>
            <ErrorMessage error={clientAddress?.country?.message} />
          </div>
          <input
            className={`${styles.input} ${getFormErrorStyles(
              styles.inputError,
              clientAddress?.country?.message
            )}`}
            id='clientCountry'
            type='text'
            {...register('clientAddress.country')}
          />
        </div>
      </div>
    </div>
  );
};
