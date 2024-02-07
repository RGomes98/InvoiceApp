import { getActiveThemeStyles } from '../../utils/getActiveThemeStyles';
import { useInvoicesFetch } from '../../hooks/useInvoicesFetch';
import { InvoiceButton } from '../InvoiceButton/InvoiceButton';
import { useThemeContext } from '../../hooks/useThemeContext';
import { Dropdown } from '../Dropdown/Dropdown';

import styles from './Heading.module.scss';

export const Heading = () => {
  const { activeTheme } = useThemeContext();
  const { invoices } = useInvoicesFetch();

  return (
    <div className={`${styles.container} ${getActiveThemeStyles(styles[activeTheme])}`}>
      <div className={styles.headingWrapper}>
        <h1 className={styles.heading}>Invoices</h1>
        <span className={styles.count}>
          {invoices?.length ? `There are ${invoices?.length} total invoices` : 'No invoices'}
        </span>
        <span className={styles.count}>
          {invoices?.length ? `${invoices?.length} invoices` : 'No invoices'}
        </span>
      </div>
      <div className={styles.actionsWrapper}>
        <Dropdown />
        <InvoiceButton />
      </div>
    </div>
  );
};
