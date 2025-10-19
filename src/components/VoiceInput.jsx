import { useState } from 'react';
import { FiMic } from 'react-icons/fi';
import { FaPause } from 'react-icons/fa';

function VoiceInput({ onVoiceInput, darkMode, theme }) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);

  const startListening = () => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError('Speech recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onVoiceInput(transcript);
    };

    recognition.onerror = (event) => {
      setError('Error occurred: ' + event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="relative">
      <button
        onClick={startListening}
        disabled={isListening}
        className={`
          p-2 rounded-full text-white transition-all duration-200 shadow-lg
          ${isListening 
            ? 'bg-gradient-to-r from-red-500 to-pink-600 animate-pulse-soft' 
            : `bg-gradient-to-r ${theme.accent} hover:scale-110`
          }
          disabled:cursor-not-allowed
        `}
        title={isListening ? 'Listening...' : 'Voice Input'}
      >
        {isListening ? <FaPause className="text-lg" /> : <FiMic className="text-lg" />}
      </button>
      {error && (
        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-48 p-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs rounded-lg shadow-lg z-10">
          {error}
        </div>
      )}
    </div>
  );
}

export default VoiceInput;
