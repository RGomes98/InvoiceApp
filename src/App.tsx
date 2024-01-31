import { useThemeContext } from './hooks/useThemeContext';
import { Invoices } from './components/Invoices/Invoices';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Heading } from './components/Heading/Heading';

import '../src/stylesheets/globals.scss';

export default function App() {
  const { activeTheme } = useThemeContext();

  return (
    <div className={`theme-container ${activeTheme}`}>
      <Sidebar />
      <main>
        <Heading />
        <Invoices />
      </main>
    </div>
  );
}
