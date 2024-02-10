export const generateInvoiceId = () => crypto.randomUUID().slice(0, 6).toUpperCase();
