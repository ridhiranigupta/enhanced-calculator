function HistoryPanel({ history, onClear, darkMode }) {
  return (
    <div className="w-full lg:w-80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl p-3 md:p-6 border-2 border-pink-200/50 dark:border-pink-900/50 animate-slide-in overflow-hidden flex flex-col max-h-[300px] lg:max-h-full">
      <div className="flex justify-between items-center mb-3 flex-shrink-0">
        <h3 className="text-base md:text-xl font-bold text-pink-600 dark:text-pink-300">
          📜 History
        </h3>
        <button
          onClick={onClear}
          className="px-2 md:px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300 rounded-lg text-xs md:text-sm hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-all duration-200"
        >
          Clear
        </button>
      </div>
      
      <div className="space-y-2 overflow-y-auto custom-scrollbar flex-1">
        {history.length === 0 ? (
          <p className="text-center text-pink-400 dark:text-pink-500 text-xs md:text-sm py-4 md:py-8">
            No calculations yet
          </p>
        ) : (
          history.map((item, index) => (
            <div
              key={index}
              className={`
                p-2 md:p-3 rounded-lg text-xs md:text-sm
                ${darkMode ? 'bg-slate-800/50 text-pink-200' : 'bg-pink-50 text-pink-900'}
                border ${darkMode ? 'border-pink-700' : 'border-pink-200'}
                animate-fade-in
              `}
            >
              <div className="font-mono text-xs break-all">
                {item.calculation}
              </div>
              <div className="text-[10px] md:text-xs text-pink-400 dark:text-pink-500 mt-1">
                {new Date(item.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HistoryPanel;
