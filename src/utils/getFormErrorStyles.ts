export const getFormErrorStyles = (className: string, error?: string) => {
  return (error && className) || '';
};
