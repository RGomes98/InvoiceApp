import { getActiveThemeStyles } from '../../utils/getActiveThemeStyles';
import { useThemeContext } from '../../hooks/useThemeContext';

import styles from './ActionsButtons.module.scss';

export const ActionsButtons = () => {
  const { activeTheme } = useThemeContext();

  return (
    <li className={`${styles.actionItem} ${getActiveThemeStyles(styles[activeTheme])}`}>
      <button className={styles.editButton}>Edit</button>
      <button className={styles.deleteButton}>Delete</button>
      <button className={styles.paidButton}>Mark as Paid</button>
    </li>
  );
};
