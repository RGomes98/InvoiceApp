import { InvoiceDetails } from './components/InvoiceDetails/InvoiceDetails';
import { InvoiceForm } from './components/InvoiceForm/InvoiceForm';
import { useBodyScrollToggle } from './hooks/useBodyScrollToggle';
import { useThemeContext } from './hooks/useThemeContext';
import { Invoices } from './components/Invoices/Invoices';
import { Sidebar } from './components/Sidebar/Sidebar';

import '../src/stylesheets/globals.scss';

export default function App() {
  const { activeTheme } = useThemeContext();
  useBodyScrollToggle();

  return (
    <div className={`theme-container ${activeTheme}`}>
      <Sidebar />
      <main>
        <Invoices />
        <InvoiceDetails />
      </main>
      <InvoiceForm />
    </div>
  );
}
