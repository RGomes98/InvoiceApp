import { getActiveThemeStyles } from '../../utils/getActiveThemeStyles';
import type { Invoice } from '../../lib/schemas/invoice.schema';
import { useThemeContext } from '../../hooks/useThemeContext';
import { formatToCurrency } from '../../utils/formatToCurrency';

import styles from './InvoiceProducts.module.scss';

export const InvoiceProducts = ({ invoice }: { invoice: Invoice }) => {
  const { activeTheme } = useThemeContext();

  return (
    <div className={`${styles.productWrapper} ${getActiveThemeStyles(styles[activeTheme])}`}>
      <ul className={styles.productList}>
        <li className={styles.productItem}>
          <span className={styles.productHeading}>Item Name</span>
          {invoice.items.map(({ name, price, quantity }, index) => {
            return (
              <div className={styles.productDetails} key={index}>
                <span className={styles.productText}>{name}</span>
                <span className={styles.mobileQuantity}>
                  {quantity} x {formatToCurrency(price)}
                </span>
              </div>
            );
          })}
        </li>
        <li className={styles.productItem}>
          <span className={styles.productHeading}>QTY.</span>
          {invoice.items.map(({ quantity }, index) => {
            return (
              <span className={styles.productText} key={index}>
                {quantity}
              </span>
            );
          })}
        </li>
        <li className={styles.productItem}>
          <span className={styles.productHeading}>Price</span>
          {invoice.items.map(({ price }, index) => {
            return (
              <span className={styles.productText} key={index}>
                {formatToCurrency(price)}
              </span>
            );
          })}
        </li>
        <li className={styles.productItem}>
          <span className={styles.productHeading}>Total</span>
          {invoice.items.map(({ total }, index) => {
            return (
              <span className={styles.productText} key={index}>
                {formatToCurrency(total)}
              </span>
            );
          })}
        </li>
      </ul>
      <div className={styles.totalWrapper}>
        <span className={styles.totalHeading}>Amount Due</span>
        <span className={styles.totalHeading}>Grand Total</span>
        <span className={styles.totalValue}>{formatToCurrency(invoice.total)}</span>
      </div>
    </div>
  );
};
