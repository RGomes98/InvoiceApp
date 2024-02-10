import { useEffect } from 'react';
import { useInvoiceContext } from './useInvoiceContext';

export const useBodyScrollToggle = () => {
  const { isInvoiceFormActive, isInvoiceMenuActive } = useInvoiceContext();
  useEffect(() => {
    const body = document.querySelector('body');
    if (!body) return;

    if (isInvoiceFormActive || isInvoiceMenuActive) body.style.overflowY = 'hidden';
    else body.style.overflowY = 'auto';
  }, [isInvoiceMenuActive, isInvoiceFormActive]);
};
