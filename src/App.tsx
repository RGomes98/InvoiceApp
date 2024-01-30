import { useThemeContext } from './hooks/useThemeContext';
import { Sidebar } from './components/Sidebar/Sidebar';

import '../src/stylesheets/globals.scss';

export default function App() {
  const { activeTheme } = useThemeContext();

  return (
    <div className={`theme-container ${activeTheme}`}>
      <Sidebar />
    </div>
  );
}
