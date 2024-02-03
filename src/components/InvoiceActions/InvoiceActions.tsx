import { getActiveThemeStyles } from '../../utils/getActiveThemeStyles';
import { ActionsButtons } from '../ActionsButtons/ActionsButtons';
import type { Invoice } from '../../lib/schemas/invoice.schema';
import { InvoiceStatus } from '../InvoiceStatus/InvoiceStatus';
import { useThemeContext } from '../../hooks/useThemeContext';

import styles from './InvoiceActions.module.scss';

export const InvoiceActions = ({ invoiceStatus }: { invoiceStatus: Invoice['status'] }) => {
  const { activeTheme } = useThemeContext();

  return (
    <ul className={`${styles.actionList} ${getActiveThemeStyles(styles[activeTheme])}`}>
      <li className={styles.actionItem}>
        <span className={styles.statusHeading}>Status</span>
        <InvoiceStatus status={invoiceStatus} />
      </li>
      <div className={styles.actionsButtons}>
        <ActionsButtons />
      </div>
    </ul>
  );
};
