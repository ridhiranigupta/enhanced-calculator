import { useState } from 'react';

function Button({ children, onClick, variant = 'default', className = '', darkMode, theme }) {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    onClick();
    setTimeout(() => setIsPressed(false), 200);
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'operation':
        return `bg-gradient-to-br ${theme.secondary} text-pink-900 dark:text-white font-bold shadow-lg hover:shadow-xl ring-1 ring-pink-300/50 dark:ring-pink-700/50`;
      case 'equals':
        return `bg-gradient-to-br ${theme.primary} text-white font-bold shadow-xl hover:shadow-2xl ring-2 ring-pink-400/50`;
      case 'clear':
        return 'bg-gradient-to-br from-red-500 to-pink-600 text-white font-bold shadow-lg hover:shadow-xl ring-1 ring-red-400/50';
      default:
        return `${darkMode ? 'bg-slate-800/90 text-rose-200 border-slate-700' : 'bg-white text-pink-900 border-pink-200'} shadow-lg hover:shadow-xl border-2 hover:border-pink-400 dark:hover:border-pink-600`;
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        ${getVariantClasses()}
        ${className}
        ${isPressed ? 'scale-95' : 'scale-100'}
        p-2 md:p-4 rounded-lg md:rounded-xl
        text-base md:text-xl
        transition-all duration-200
        hover:scale-105 active:scale-95
        ripple
        focus:outline-none focus:ring-2 focus:ring-pink-400
      `}
    >
      {children}
    </button>
  );
}

export default Button;
