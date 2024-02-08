import { getActiveThemeStyles } from '../../utils/getActiveThemeStyles';
import { useThemeContext } from '../../hooks/useThemeContext';
import { Fragment } from 'react';

import EmptyLogo from '../../assets/svgs/illustration-empty.svg?react';
import styles from './EmptyInvoices.module.scss';

export const EmptyInvoices = ({ isInvoiceListEmpty }: { isInvoiceListEmpty: boolean }) => {
  const { activeTheme } = useThemeContext();

  return (
    <div className={`${styles.container} ${getActiveThemeStyles(styles[activeTheme])}`}>
      <EmptyLogo />
      <div className={styles.textWrapper}>
        <span className={styles.heading}>There is nothing here</span>

        {isInvoiceListEmpty ? (
          <Fragment>
            <p className={styles.text}>
              Create an invoice by clicking the <span className={styles.variant}>New Invoice</span> button and
              get started
            </p>
            <p className={styles.text}>
              Create an invoice by clicking the <span className={styles.variant}>New</span> button and get
              started
            </p>
          </Fragment>
        ) : (
          <p className={styles.textFilter}>There are no invoices to display based on the selected status</p>
        )}
      </div>
    </div>
  );
};
