import { getActiveThemeStyles } from '../../utils/getActiveThemeStyles';
import { getFormErrorStyles } from '../../utils/getFormErrorStyles';
import { useThemeContext } from '../../hooks/useThemeContext';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { FormSlice } from '../../hooks/useInvoiceForm';

import styles from './InvoiceSenderFormSlice.module.scss';

export const InvoiceSenderFormSlice = ({ register, errors }: FormSlice) => {
  const { activeTheme } = useThemeContext();
  const { senderAddress } = errors;

  return (
    <div className={`${styles.senderWrapper} ${getActiveThemeStyles(styles[activeTheme])}`}>
      <span className={styles.heading}>Bill From</span>
      <div className={styles.inputWrapper}>
        <div className={styles.labelWrapper}>
          <label
            className={`${styles.label} ${getFormErrorStyles(
              styles.labelError,
              senderAddress?.street?.message
            )}`}
            htmlFor='senderStreet'
          >
            Street Address
          </label>
          <ErrorMessage error={senderAddress?.street?.message} />
        </div>
        <input
          className={`${styles.input} ${getFormErrorStyles(
            styles.inputError,
            senderAddress?.street?.message
          )}`}
          id='senderStreet'
          type='text'
          {...register('senderAddress.street')}
        />
      </div>
      <div className={styles.addressWrapper}>
        <div className={styles.inputWrapper}>
          <div className={styles.labelWrapper}>
            <label
              className={`${styles.label} ${getFormErrorStyles(
                styles.labelError,
                senderAddress?.city?.message
              )}`}
              htmlFor='senderCity'
            >
              City
            </label>
            <ErrorMessage error={senderAddress?.city?.message} />
          </div>
          <input
            className={`${styles.input} ${getFormErrorStyles(
              styles.inputError,
              senderAddress?.city?.message
            )}`}
            id='senderCity'
            type='text'
            {...register('senderAddress.city')}
          />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.labelWrapper}>
            <label
              className={`${styles.label} ${getFormErrorStyles(
                styles.labelError,
                senderAddress?.postCode?.message
              )}`}
              htmlFor='senderPostCode'
            >
              Post Code
            </label>
            <ErrorMessage error={senderAddress?.postCode?.message} />
          </div>
          <input
            className={`${styles.input} ${getFormErrorStyles(
              styles.inputError,
              senderAddress?.postCode?.message
            )}`}
            placeholder='E1 3EZ'
            id='senderPostCode'
            type='text'
            {...register('senderAddress.postCode')}
          />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.labelWrapper}>
            <label
              className={`${styles.label} ${getFormErrorStyles(
                styles.labelError,
                senderAddress?.country?.message
              )}`}
              htmlFor='senderCountry'
            >
              Country
            </label>
            <ErrorMessage error={senderAddress?.country?.message} />
          </div>
          <input
            className={`${styles.input} ${getFormErrorStyles(
              styles.inputError,
              senderAddress?.country?.message
            )}`}
            id='senderCountry'
            type='text'
            {...register('senderAddress.country')}
          />
        </div>
      </div>
    </div>
  );
};
