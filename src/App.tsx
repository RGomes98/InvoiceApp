import { InvoiceDetails } from './components/InvoiceDetails/InvoiceDetails';
import { useBodyScrollToggle } from './hooks/useBodyScrollToggle';
import { useInvoiceContext } from './hooks/useInvoiceContext';
import { useThemeContext } from './hooks/useThemeContext';
import { Invoices } from './components/Invoices/Invoices';
import { Sidebar } from './components/Sidebar/Sidebar';

import '../src/stylesheets/globals.scss';

export default function App() {
  const { isInvoiceMenuActive } = useInvoiceContext();
  const { activeTheme } = useThemeContext();
  useBodyScrollToggle(isInvoiceMenuActive);

  return (
    <div className={`theme-container ${activeTheme}`}>
      <Sidebar />
      <main>
        <Invoices />
        <InvoiceDetails />
      </main>
    </div>
  );
}
