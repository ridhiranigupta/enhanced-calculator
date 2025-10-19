import { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiMic, FiPause, FiGrid, FiActivity } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { MdGridOn } from 'react-icons/md';
import Display from './components/Display';
import Button from './components/Button';
import ScientificPanel from './components/ScientificPanel';
import HistoryPanel from './components/HistoryPanel';
import ThemeToggle from './components/ThemeToggle';
import VoiceInput from './components/VoiceInput';
import ThemeCustomizer from './components/ThemeCustomizer';
import ErrorModal from './components/ErrorModal';
import BinaryPanel from './components/BinaryPanel';
import CalculusPanel from './components/CalculusPanel';

function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(true);
  const [scientificMode, setScientificMode] = useState(false);
  const [binaryMode, setBinaryMode] = useState(false);
  const [calculusMode, setCalculusMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);
  const [error, setError] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('elegant');

  // Theme configurations - More refined and elegant
  const themes = {
    elegant: {
      primary: 'from-rose-400 via-pink-500 to-fuchsia-500',
      secondary: 'from-rose-300 to-pink-400',
      background: 'bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50',
      darkBackground: 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950',
      accent: 'from-rose-500 to-pink-600',
    },
    default: {
      primary: 'from-pink-400 to-pink-600',
      secondary: 'from-pink-300 to-pink-500',
      background: 'bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100',
      darkBackground: 'bg-gradient-to-br from-pink-950 via-rose-950 to-pink-900',
      accent: 'from-pink-500 to-pink-700',
    },
    pastel: {
      primary: 'from-pink-300 to-rose-400',
      secondary: 'from-pink-200 to-rose-300',
      background: 'bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100',
      darkBackground: 'bg-gradient-to-br from-slate-900 via-pink-950 to-rose-950',
      accent: 'from-pink-400 to-rose-500',
    },
    hot: {
      primary: 'from-pink-600 to-fuchsia-700',
      secondary: 'from-pink-500 to-fuchsia-600',
      background: 'bg-gradient-to-br from-pink-100 via-fuchsia-100 to-pink-200',
      darkBackground: 'bg-gradient-to-br from-fuchsia-950 via-pink-950 to-slate-950',
      accent: 'from-pink-700 to-fuchsia-800',
    },
    bubblegum: {
      primary: 'from-pink-400 to-purple-500',
      secondary: 'from-pink-300 to-purple-400',
      background: 'bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50',
      darkBackground: 'bg-gradient-to-br from-purple-950 via-pink-950 to-slate-950',
      accent: 'from-pink-500 to-purple-600',
    },
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent keyboard input in binary mode or when inputs are focused
      if (binaryMode || e.target.tagName === 'INPUT') return;

      e.preventDefault();

      // Numbers
      if (e.key >= '0' && e.key <= '9') {
        inputDigit(parseInt(e.key));
      }
      // Decimal point
      else if (e.key === '.') {
        inputDecimal();
      }
      // Operations
      else if (e.key === '+') {
        performOperation('+');
      } else if (e.key === '-') {
        performOperation('-');
      } else if (e.key === '*') {
        performOperation('×');
      } else if (e.key === '/') {
        performOperation('÷');
      } else if (e.key === '%') {
        performOperation('%');
      }
      // Calculate
      else if (e.key === 'Enter' || e.key === '=') {
        performOperation('=');
      }
      // Clear
      else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
        clear();
      }
      // Backspace
      else if (e.key === 'Backspace') {
        if (display.length > 1) {
          setDisplay(display.slice(0, -1));
        } else {
          setDisplay('0');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display, operation, previousValue, waitingForOperand, binaryMode]);

  const addToHistory = (calculation) => {
    const newHistory = [...history, { calculation, timestamp: new Date() }];
    setHistory(newHistory.slice(-10)); // Keep only last 10 calculations
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let newValue;

      try {
        switch (operation) {
          case '+':
            newValue = currentValue + inputValue;
            break;
          case '-':
            newValue = currentValue - inputValue;
            break;
          case '×':
            newValue = currentValue * inputValue;
            break;
          case '÷':
            if (inputValue === 0) {
              throw new Error('Cannot divide by zero! 🙈');
            }
            newValue = currentValue / inputValue;
            break;
          case '%':
            newValue = currentValue % inputValue;
            break;
          default:
            newValue = inputValue;
        }

        const calculation = `${currentValue} ${operation} ${inputValue} = ${newValue}`;
        addToHistory(calculation);
        setDisplay(String(newValue));
        setPreviousValue(newValue);
      } catch (err) {
        setError(err.message);
        clear();
        return;
      }
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleScientificOperation = (op) => {
    const value = parseFloat(display);
    let result;

    try {
      switch (op) {
        case 'sin':
          result = Math.sin(value * Math.PI / 180);
          break;
        case 'cos':
          result = Math.cos(value * Math.PI / 180);
          break;
        case 'tan':
          result = Math.tan(value * Math.PI / 180);
          break;
        case 'log':
          if (value <= 0) throw new Error('Cannot calculate log of non-positive number! 🤔');
          result = Math.log10(value);
          break;
        case 'ln':
          if (value <= 0) throw new Error('Cannot calculate ln of non-positive number! 🤔');
          result = Math.log(value);
          break;
        case 'sqrt':
          if (value < 0) throw new Error('Cannot calculate square root of negative number! 😵');
          result = Math.sqrt(value);
          break;
        case 'x²':
          result = value * value;
          break;
        case 'xⁿ':
          setOperation('power');
          setPreviousValue(value);
          setWaitingForOperand(true);
          return;
        case 'π':
          result = Math.PI;
          break;
        case 'e':
          result = Math.E;
          break;
        default:
          result = value;
      }

      const calculation = `${op}(${value}) = ${result}`;
      addToHistory(calculation);
      setDisplay(String(result));
      setWaitingForOperand(true);
    } catch (err) {
      setError(err.message);
      clear();
    }
  };

  const handleVoiceInput = (text) => {
    // Parse voice input and convert to calculator operations
    const cleanText = text.toLowerCase()
      .replace(/plus|add/g, '+')
      .replace(/minus|subtract/g, '-')
      .replace(/times|multiply|multiplied by/g, '×')
      .replace(/divided by|divide/g, '÷')
      .replace(/equals|equal/g, '=');

    // Extract numbers and operations
    const tokens = cleanText.match(/[\d.]+|[+\-×÷=]/g);
    
    if (tokens && tokens.length > 0) {
      clear();
      tokens.forEach((token, index) => {
        if (!isNaN(token)) {
          token.split('').forEach(char => {
            if (char === '.') inputDecimal();
            else inputDigit(char);
          });
        } else if (['+', '-', '×', '÷'].includes(token)) {
          performOperation(token);
        } else if (token === '=') {
          performOperation('=');
        }
      });
    }
  };

  const theme = themes[currentTheme];

  return (
    <div className={`min-h-screen overflow-x-hidden ${darkMode ? theme.darkBackground : theme.background} animate-gradient transition-all duration-700 p-2 sm:p-3 md:p-6`}>
      <div className="w-full max-w-7xl mx-auto flex flex-col h-full">
        {/* Header with theme controls in top right */}
        <header className="mb-3 md:mb-6 animate-fade-in flex-shrink-0">
          <div className="flex items-center justify-between gap-2">
            {/* Left: Title */}
            <div className="flex items-center gap-2 md:gap-3">
              <HiSparkles className="text-2xl sm:text-3xl md:text-5xl text-pink-500 dark:text-pink-400 animate-pulse-soft glow-effect" />
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent font-poppins drop-shadow-lg tracking-tight">
                  Calculator
                </h1>
                <p className="text-pink-600 dark:text-pink-400 text-xs md:text-sm font-medium hidden sm:block">
                  Beautiful design meets powerful functionality
                </p>
              </div>
            </div>
            
            {/* Right: Theme Toggle & Customizer */}
            <div className="flex items-center gap-2">
              <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} theme={theme} />
              <button
                onClick={() => setShowThemeCustomizer(!showThemeCustomizer)}
                className={`p-2 rounded-full bg-gradient-to-r ${theme.accent} text-white hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl`}
                title="Customize Theme"
              >
                <IoColorPaletteOutline className="text-base md:text-lg" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content - Responsive Layout */}
        <div className="flex flex-col lg:flex-row gap-3 md:gap-4 flex-1 min-h-0 overflow-y-auto lg:overflow-hidden">
          {/* Calculator Body */}
          <div className="w-full lg:w-96 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl p-4 md:p-6 border-2 border-pink-200/50 dark:border-pink-900/50 ring-1 ring-pink-300/20 dark:ring-pink-700/20 flex flex-col">
            {/* Control Bar */}
            <div className="flex justify-center items-center mb-4 gap-2 flex-shrink-0">
              <VoiceInput onVoiceInput={handleVoiceInput} darkMode={darkMode} theme={theme} />
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
              {/* Theme Customizer */}
              {showThemeCustomizer && (
                <ThemeCustomizer
                  currentTheme={currentTheme}
                  setCurrentTheme={setCurrentTheme}
                themes={themes}
              />
            )}

            {/* Display */}
            <Display value={display} darkMode={darkMode} />

            {/* Binary Panel */}
            {binaryMode && (
              <BinaryPanel
                darkMode={darkMode}
                theme={theme}
              />
            )}

            {/* Scientific Panel */}
            {scientificMode && !binaryMode && (
              <ScientificPanel
                onOperation={handleScientificOperation}
                darkMode={darkMode}
                theme={theme}
              />
            )}

            {/* Mode Toggle */}
            <div className="mb-2 md:mb-3 grid grid-cols-2 gap-1.5 md:gap-2">
              <button
                onClick={() => {
                  setScientificMode(!scientificMode);
                  if (!scientificMode) {
                    setBinaryMode(false);
                    setCalculusMode(false);
                  }
                }}
                className={`py-1.5 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                  scientificMode
                    ? `bg-gradient-to-r ${theme.primary} text-white shadow-lg scale-105`
                    : `${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-pink-100 hover:bg-pink-200'} text-pink-600 dark:text-pink-300`
                }`}
              >
                {scientificMode ? (
                  <>
                    <FiGrid className="text-sm" />
                    Basic
                  </>
                ) : (
                  <>
                    <FiActivity className="text-sm" />
                    Scientific
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setBinaryMode(!binaryMode);
                  if (!binaryMode) {
                    setScientificMode(false);
                    setCalculusMode(false);
                  }
                }}
                className={`py-1.5 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 ${
                  binaryMode
                    ? `bg-gradient-to-r ${theme.accent} text-white shadow-lg scale-105`
                    : `${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-pink-100 hover:bg-pink-200'} text-pink-600 dark:text-pink-300`
                }`}
              >
                {binaryMode ? (
                  <>
                    <FiGrid className="text-sm" />
                    Decimal
                  </>
                ) : (
                  <>
                    <MdGridOn className="text-sm" />
                    Binary
                  </>
                )}
              </button>
            </div>

            {/* Button Grid - Only show when not in binary mode */}
            {!binaryMode && (
              <div className="grid grid-cols-4 gap-2 md:gap-3">
              <Button onClick={clear} variant="clear" darkMode={darkMode} theme={theme}>C</Button>
              <Button onClick={() => performOperation('%')} variant="operation" darkMode={darkMode} theme={theme}>%</Button>
              <Button onClick={() => setDisplay(String(-parseFloat(display)))} variant="operation" darkMode={darkMode} theme={theme}>±</Button>
              <Button onClick={() => performOperation('÷')} variant="operation" darkMode={darkMode} theme={theme}>÷</Button>

              <Button onClick={() => inputDigit(7)} darkMode={darkMode} theme={theme}>7</Button>
              <Button onClick={() => inputDigit(8)} darkMode={darkMode} theme={theme}>8</Button>
              <Button onClick={() => inputDigit(9)} darkMode={darkMode} theme={theme}>9</Button>
              <Button onClick={() => performOperation('×')} variant="operation" darkMode={darkMode} theme={theme}>×</Button>

              <Button onClick={() => inputDigit(4)} darkMode={darkMode} theme={theme}>4</Button>
              <Button onClick={() => inputDigit(5)} darkMode={darkMode} theme={theme}>5</Button>
              <Button onClick={() => inputDigit(6)} darkMode={darkMode} theme={theme}>6</Button>
              <Button onClick={() => performOperation('-')} variant="operation" darkMode={darkMode} theme={theme}>-</Button>

              <Button onClick={() => inputDigit(1)} darkMode={darkMode} theme={theme}>1</Button>
              <Button onClick={() => inputDigit(2)} darkMode={darkMode} theme={theme}>2</Button>
              <Button onClick={() => inputDigit(3)} darkMode={darkMode} theme={theme}>3</Button>
              <Button onClick={() => performOperation('+')} variant="operation" darkMode={darkMode} theme={theme}>+</Button>

              <Button onClick={() => inputDigit(0)} className="col-span-2" darkMode={darkMode} theme={theme}>0</Button>
              <Button onClick={inputDecimal} darkMode={darkMode} theme={theme}>.</Button>
              <Button onClick={() => performOperation('=')} variant="equals" darkMode={darkMode} theme={theme}>=</Button>
            </div>
            )}
            </div>
            {/* End of scrollable content */}
          </div>

          {/* Right Side Panels - History and Calculus (Desktop: side by side, Mobile: stacked with tabs) */}
          <div className="w-full lg:flex-1 flex flex-col gap-3 lg:gap-4 lg:flex-row">
            {/* Mobile Tab Selector */}
            <div className="lg:hidden flex gap-2 mb-2">
              <button
                onClick={() => setCalculusMode(false)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  !calculusMode
                    ? `bg-gradient-to-r ${theme.primary} text-white shadow-lg`
                    : `${darkMode ? 'bg-slate-800' : 'bg-pink-100'} text-pink-600 dark:text-pink-300`
                }`}
              >
                History
              </button>
              <button
                onClick={() => setCalculusMode(true)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-1 ${
                  calculusMode
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : `${darkMode ? 'bg-slate-800' : 'bg-pink-100'} text-purple-600 dark:text-purple-300`
                }`}
              >
                Calculus
                <span className="text-xs px-1.5 py-0.5 bg-white/20 rounded-full">BETA</span>
              </button>
            </div>

            {/* History Panel */}
            <div className={`flex-1 ${calculusMode ? 'hidden lg:block' : 'block'}`}>
              <HistoryPanel
                history={history}
                onClear={clearHistory}
                darkMode={darkMode}
                theme={theme}
              />
            </div>

            {/* Calculus Panel - Experimental Beta with Sticker */}
            <div className={`flex-1 relative ${!calculusMode ? 'hidden lg:block' : 'block'}`}>
              {/* Beta Sticker */}
              <div className="absolute -top-2 -right-2 lg:top-2 lg:right-2 z-10 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse-soft rotate-12 border-2 border-white dark:border-slate-800">
                🧪 EXPERIMENTAL BETA
              </div>
              
              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl p-4 border-2 border-purple-200/50 dark:border-purple-900/50 ring-1 ring-purple-300/20 dark:ring-purple-700/20 h-full overflow-y-auto custom-scrollbar">
                <CalculusPanel darkMode={darkMode} theme={theme} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-4 text-pink-600 dark:text-pink-400 animate-fade-in flex-shrink-0">
          <p className="text-xs md:text-sm flex items-center justify-center gap-1">
            <span>Made with</span>
            <HiSparkles className="text-pink-500 dark:text-pink-400 animate-pulse" />
            <span>by</span>
            <a
              href="https://github.com/ridhiranigupta"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-pink-700 dark:hover:text-pink-300 transition-colors underline decoration-pink-400 decoration-wavy"
            >
              Ridhi Rani Gupta
            </a>
          </p>
        </footer>
      </div>

      {/* Error Modal */}
      {error && <ErrorModal message={error} onClose={() => setError(null)} />}
    </div>
  );
}

export default App;
