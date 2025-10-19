import { useEffect } from 'react';

function ErrorModal({ message, onClose }) {
  useEffect(() => {
    // Auto-close after 3 seconds
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full border-4 border-pink-300 dark:border-pink-700 animate-scale-in">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse-soft">😔</div>
          <h3 className="text-xl md:text-2xl font-bold text-pink-600 dark:text-pink-300 mb-3">
            Oops!
          </h3>
          <p className="text-pink-700 dark:text-pink-400 mb-6">
            {message}
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-pink-400 to-pink-600 text-white font-semibold rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg"
          >
            Got it! 💖
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorModal;
