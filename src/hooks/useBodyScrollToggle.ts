import { useEffect } from 'react';

export const useBodyScrollToggle = (isInvoiceMenuActive: boolean) => {
  useEffect(() => {
    const body = document.querySelector('body');
    if (!body) return;

    if (isInvoiceMenuActive) body.style.overflowY = 'hidden';
    else body.style.overflowY = 'auto';
  }, [isInvoiceMenuActive]);
};
