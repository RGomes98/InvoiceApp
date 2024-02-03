import { getActiveThemeStyles } from '../../utils/getActiveThemeStyles';
import { useThemeContext } from '../../hooks/useThemeContext';

import styles from './InvoiceStatus.module.scss';

export const InvoiceStatus = ({ status }: { status: string }) => {
  const { activeTheme } = useThemeContext();

  return (
    <div className={`${styles.container} ${getActiveThemeStyles(styles[activeTheme])}`}>
      <div className={`${styles.statusWrapper} ${styles[`transparent-${status}`]}`}>
        <span className={`${styles.dot} ${styles[`solid-${status}`]}`} />
        <span className={`${styles.status} ${styles[`color-${status}`]}`}>{status}</span>
      </div>
    </div>
  );
};
