import { getActiveThemeStyles } from '../../utils/getActiveThemeStyles';
import { useThemeContext } from '../../hooks/useThemeContext';

import ArrowLeftIcon from '../../assets/icons/icon-arrow-left.svg?react';
import styles from './BackButton.module.scss';

export const BackButton = ({ action }: { action: () => void }) => {
  const { activeTheme } = useThemeContext();

  return (
    <button
      className={`${styles.backButton} ${getActiveThemeStyles(styles[activeTheme])}`}
      onClick={action}
      type='button'
    >
      <ArrowLeftIcon className={styles.arrowIcon} />
      Go Back
    </button>
  );
};
