import styles from './ErrorMessage.module.scss';

export const ErrorMessage = ({ error }: { error?: string }) => {
  return error ? <span className={styles.errorMessage}>{error}</span> : null;
};
