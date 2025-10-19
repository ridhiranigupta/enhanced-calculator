function Display({ value, darkMode }) {
  return (
    <div className="mb-3 md:mb-4">
      <div className={`
        ${darkMode ? 'bg-slate-950/80 text-rose-300' : 'bg-gradient-to-br from-pink-50 to-rose-50 text-pink-900'}
        rounded-xl md:rounded-2xl p-4 md:p-6 text-right font-bold text-2xl md:text-4xl
        border-2 ${darkMode ? 'border-pink-800/50' : 'border-pink-300/50'}
        shadow-inner min-h-[70px] md:min-h-[90px]
        flex items-center justify-end
        transition-all duration-300
        overflow-hidden
        ring-1 ${darkMode ? 'ring-pink-900/30' : 'ring-pink-200/50'}
      `}>
        <span className="truncate animate-fade-in font-poppins tracking-tight">{value}</span>
      </div>
    </div>
  );
}

export default Display;
