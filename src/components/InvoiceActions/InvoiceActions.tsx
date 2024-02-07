import { getActiveThemeStyles } from '../../utils/getActiveThemeStyles';
import type { Invoice } from '../../lib/schemas/invoice.schema';
import { InvoiceStatus } from '../InvoiceStatus/InvoiceStatus';
import { useThemeContext } from '../../hooks/useThemeContext';
import type { ReactNode } from 'react';

import styles from './InvoiceActions.module.scss';

type InvoiceActions = { children?: ReactNode; invoiceStatus: Invoice['status'] };

export const InvoiceActions = ({ children, invoiceStatus }: InvoiceActions) => {
  const { activeTheme } = useThemeContext();

  return (
    <ul className={`${styles.actionList} ${getActiveThemeStyles(styles[activeTheme])}`}>
      <li className={styles.actionItem}>
        <span className={styles.statusHeading}>Status</span>
        <InvoiceStatus status={invoiceStatus} />
      </li>
      <li className={styles.actionsButtons}>{children}</li>
    </ul>
  );
};
