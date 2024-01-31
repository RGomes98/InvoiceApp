import { useInvoiceContext } from '../../hooks/useInvoiceContext';
import { useThemeContext } from '../../hooks/useThemeContext';
import { FilterOptions } from '../../context/InvoiceContext';

import ArrowDownIcon from '../../assets/icons/icon-arrow-down.svg?react';
import styles from './Dropdown.module.scss';

export const Dropdown = () => {
  const { isDropdownActive, setIsDropdownActive, activeFilter, setActiveFilter } = useInvoiceContext();
  const { activeTheme } = useThemeContext();

  const handleSelectFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.id as FilterOptions;
    setIsDropdownActive(false);
    setActiveFilter((currentFilter) => (currentFilter === id ? undefined : id));
  };

  const handleDropdownToggle = () => {
    setIsDropdownActive((currentStatus) => !currentStatus);
  };

  return (
    <div className={`${styles.dropdownWrapper} ${styles[activeTheme]}`}>
      <button className={styles.dropdownButton} onClick={handleDropdownToggle}>
        <span className={styles.buttonText}>Filter by status</span>{' '}
        <span className={styles.buttonText}>Filter</span>{' '}
        <ArrowDownIcon className={`${styles.arrowIcon} ${(isDropdownActive && styles.rotate) || ''}`} />
      </button>
      {isDropdownActive && (
        <ul className={styles.statusList}>
          <li className={styles.statusItem}>
            <button className={styles.button} id='draft' onClick={handleSelectFilter}>
              <input
                checked={activeFilter === 'draft'}
                className={styles.checkbox}
                type='checkbox'
                readOnly
              />
              <span className={styles.text}>Draft</span>
            </button>
          </li>
          <li className={styles.statusItem}>
            <button className={styles.button} id='pending' onClick={handleSelectFilter}>
              <input
                checked={activeFilter === 'pending'}
                className={styles.checkbox}
                type='checkbox'
                readOnly
              />
              <span className={styles.text}>Pending</span>
            </button>
          </li>
          <li className={styles.statusItem}>
            <button className={styles.button} id='paid' onClick={handleSelectFilter}>
              <input checked={activeFilter === 'paid'} className={styles.checkbox} type='checkbox' readOnly />
              <span className={styles.text}>Paid</span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};
