import { InvoiceContextProvider } from './context/InvoiceContext.tsx';
import { ThemeContextProvider } from './context/ThemeContext.tsx';

import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <InvoiceContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </InvoiceContextProvider>
  </React.StrictMode>
);
