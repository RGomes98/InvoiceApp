import { getActiveThemeStyles } from '../../utils/getActiveThemeStyles';
import { useThemeContext } from '../../hooks/useThemeContext';
import { useThemeToggle } from '../../hooks/useThemeToggle';

import MoonIcon from '../../assets/icons/icon-moon.svg?react';
import SunIcon from '../../assets/icons/icon-sun.svg?react';
import avatar from '../../assets/images/image-avatar.jpg';
import Logo from '../../assets/svgs/logo.svg?react';
import styles from './Sidebar.module.scss';

export const Sidebar = () => {
  const { handleThemeToggle } = useThemeToggle();
  const { activeTheme } = useThemeContext();

  const isLightModeActive = activeTheme === 'light';

  return (
    <nav className={`${styles.sidebar} ${getActiveThemeStyles(styles[activeTheme])}`}>
      <div className={styles.logoWrapper}>
        <Logo className={styles.logo} />
      </div>
      <button className={styles.themeButton} onClick={handleThemeToggle}>
        {isLightModeActive ? (
          <MoonIcon className={styles.themeIcon} />
        ) : (
          <SunIcon className={styles.themeIcon} />
        )}
      </button>
      <div className={styles.profileWrapper}>
        <img className={styles.profilePicture} src={avatar} alt='profile-picture' />
      </div>
    </nav>
  );
};
