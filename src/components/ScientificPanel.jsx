function ScientificPanel({ onOperation, darkMode, theme }) {
  const scientificButtons = [
    { label: 'sin', op: 'sin' },
    { label: 'cos', op: 'cos' },
    { label: 'tan', op: 'tan' },
    { label: 'log', op: 'log' },
    { label: 'ln', op: 'ln' },
    { label: '√', op: 'sqrt' },
    { label: 'x²', op: 'x²' },
    { label: 'π', op: 'π' },
    { label: 'e', op: 'e' },
  ];

  return (
    <div className="mb-2 md:mb-4 animate-slide-in">
      <div className="grid grid-cols-3 gap-1.5 md:gap-2 p-2 md:p-3 bg-pink-50/50 dark:bg-slate-800/50 rounded-lg md:rounded-xl border border-pink-200 dark:border-pink-700">
        {scientificButtons.map((btn) => (
          <button
            key={btn.op}
            onClick={() => onOperation(btn.op)}
            className={`
              p-1.5 md:p-2 rounded-md md:rounded-lg text-xs md:text-sm font-semibold
              bg-gradient-to-br ${theme.secondary}
              ${darkMode ? 'text-white' : 'text-pink-800'}
              hover:scale-105 active:scale-95
              transition-all duration-200
              shadow-md hover:shadow-lg
            `}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ScientificPanel;
