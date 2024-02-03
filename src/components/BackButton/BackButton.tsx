import { getActiveThemeStyles } from '../../utils/getActiveThemeStyles';
import { useInvoiceContext } from '../../hooks/useInvoiceContext';
import { useThemeContext } from '../../hooks/useThemeContext';

import ArrowLeftIcon from '../../assets/icons/icon-arrow-left.svg?react';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const { setIsInvoiceMenuActive } = useInvoiceContext();
  const { activeTheme } = useThemeContext();

  return (
    <button
      className={`${styles.backButton} ${getActiveThemeStyles(styles[activeTheme])}`}
      onClick={() => setIsInvoiceMenuActive(false)}
    >
      <ArrowLeftIcon className={styles.arrowIcon} />
      Go Back
    </button>
  );
};
