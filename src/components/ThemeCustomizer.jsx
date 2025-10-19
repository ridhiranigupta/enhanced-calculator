import { HiSparkles } from 'react-icons/hi';
import { FaHeart, FaFire, FaStar } from 'react-icons/fa';
import { MdLocalFlorist } from 'react-icons/md';

function ThemeCustomizer({ currentTheme, setCurrentTheme, themes }) {
  const themeNames = {
    elegant: { name: 'Elegant', icon: HiSparkles },
    default: { name: 'Default Pink', icon: FaHeart },
    pastel: { name: 'Pastel Pink', icon: MdLocalFlorist },
    hot: { name: 'Hot Pink', icon: FaFire },
    bubblegum: { name: 'Bubblegum', icon: FaStar },
  };

  return (
    <div className="mb-6 p-4 bg-pink-50/50 dark:bg-gray-800/50 rounded-xl border border-pink-200 dark:border-pink-700 animate-fade-in">
      <h4 className="text-sm font-semibold text-pink-600 dark:text-pink-300 mb-3 flex items-center gap-2">
        <HiSparkles className="text-base" />
        Choose Your Theme
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {Object.entries(themeNames).map(([key, { name, icon: Icon }]) => (
          <button
            key={key}
            onClick={() => setCurrentTheme(key)}
            className={`
              p-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5
              ${currentTheme === key
                ? 'bg-gradient-to-r from-rose-400 to-pink-600 text-white shadow-lg scale-105 ring-2 ring-pink-400'
                : 'bg-white dark:bg-gray-800 text-pink-600 dark:text-pink-300 hover:scale-105 border border-pink-200 dark:border-pink-700'
              }
            `}
          >
            <Icon className="text-sm" />
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeCustomizer;
