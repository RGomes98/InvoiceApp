import { useThemeContext } from '../../hooks/useThemeContext';

import EmptyLogo from '../../assets/svgs/illustration-empty.svg?react';
import styles from './EmptyInvoices.module.scss';

export const EmptyInvoices = () => {
  const { activeTheme } = useThemeContext();

  return (
    <div className={`${styles.container} ${styles[activeTheme]}`}>
      <EmptyLogo />
      <div className={styles.textWrapper}>
        <span className={styles.heading}>There is nothing here</span>
        <p className={styles.text}>
          Create an invoice by clicking the <span className={styles.variant}>New Invoice</span> button and get
          started
        </p>
      </div>
    </div>
  );
};
