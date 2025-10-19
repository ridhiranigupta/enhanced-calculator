import { FiSun, FiMoon } from 'react-icons/fi';

function ThemeToggle({ darkMode, setDarkMode, theme }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`p-2 rounded-full bg-gradient-to-r ${theme.accent} text-white hover:scale-110 transition-transform duration-200 shadow-lg`}
      title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {darkMode ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
    </button>
  );
}

export default ThemeToggle;
