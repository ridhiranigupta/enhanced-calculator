import { useState } from 'react';

function BinaryPanel({ darkMode, theme }) {
  const [binary1, setBinary1] = useState('');
  const [binary2, setBinary2] = useState('');
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState('');
  const [decimal1, setDecimal1] = useState('');
  const [decimal2, setDecimal2] = useState('');
  const [decimalResult, setDecimalResult] = useState('');

  const validateBinary = (value) => {
    return /^[01]*$/.test(value);
  };

  const binaryToDecimal = (binary) => {
    if (!binary) return 0;
    return parseInt(binary, 2);
  };

  const decimalToBinary = (decimal) => {
    if (decimal < 0) {
      // Handle negative numbers using two's complement (8-bit for simplicity)
      return (decimal >>> 0).toString(2).slice(-8);
    }
    return decimal.toString(2);
  };

  const handleBinary1Change = (value) => {
    if (validateBinary(value) || value === '') {
      setBinary1(value);
      setDecimal1(value ? binaryToDecimal(value).toString() : '');
    }
  };

  const handleBinary2Change = (value) => {
    if (validateBinary(value) || value === '') {
      setBinary2(value);
      setDecimal2(value ? binaryToDecimal(value).toString() : '');
    }
  };

  const calculate = () => {
    if (!binary1 && !binary2) return;

    const num1 = binaryToDecimal(binary1 || '0');
    const num2 = binaryToDecimal(binary2 || '0');
    let resultDec;

    switch (operation) {
      case '+':
        resultDec = num1 + num2;
        break;
      case '-':
        resultDec = num1 - num2;
        break;
      case '×':
        resultDec = num1 * num2;
        break;
      case '÷':
        resultDec = num2 !== 0 ? Math.floor(num1 / num2) : 0;
        break;
      case 'AND':
        resultDec = num1 & num2;
        break;
      case 'OR':
        resultDec = num1 | num2;
        break;
      case 'XOR':
        resultDec = num1 ^ num2;
        break;
      case 'NOT':
        resultDec = ~num1;
        break;
      case '<<':
        resultDec = num1 << num2;
        break;
      case '>>':
        resultDec = num1 >> num2;
        break;
      default:
        resultDec = 0;
    }

    setDecimalResult(resultDec.toString());
    setResult(decimalToBinary(resultDec));
  };

  const clear = () => {
    setBinary1('');
    setBinary2('');
    setDecimal1('');
    setDecimal2('');
    setResult('');
    setDecimalResult('');
  };

  const insertBit = (bit) => {
    if (!binary2) {
      handleBinary1Change(binary1 + bit);
    } else {
      handleBinary2Change(binary2 + bit);
    }
  };

  return (
    <div className={`mb-2 md:mb-4 p-3 md:p-4 ${darkMode ? 'bg-slate-800/50' : 'bg-pink-50/50'} rounded-lg md:rounded-xl border ${darkMode ? 'border-pink-700' : 'border-pink-200'} animate-slide-in`}>
      <h3 className="text-sm md:text-lg font-bold text-pink-600 dark:text-pink-300 mb-2 md:mb-3 text-center">
        🔢 Binary Calculator
      </h3>

      {/* Input Fields */}
      <div className="space-y-2 mb-2 md:mb-3">
        <div>
          <label className="text-[10px] md:text-xs font-semibold text-pink-600 dark:text-pink-400 mb-0.5 block">
            Binary 1 (Decimal: {decimal1 || '0'})
          </label>
          <input
            type="text"
            value={binary1}
            onChange={(e) => handleBinary1Change(e.target.value)}
            placeholder="Enter binary (e.g., 1010)"
            className={`w-full px-2 md:px-3 py-1.5 md:py-2 rounded-lg font-mono text-xs md:text-sm
              ${darkMode ? 'bg-slate-950 text-pink-200 border-pink-700' : 'bg-white text-pink-900 border-pink-200'}
              border-2 focus:outline-none focus:ring-2 focus:ring-pink-400`}
          />
        </div>

        <div>
          <label className="text-[10px] md:text-xs font-semibold text-pink-600 dark:text-pink-400 mb-0.5 block">
            Binary 2 (Decimal: {decimal2 || '0'})
          </label>
          <input
            type="text"
            value={binary2}
            onChange={(e) => handleBinary2Change(e.target.value)}
            placeholder="Enter binary (e.g., 0110)"
            className={`w-full px-2 md:px-3 py-1.5 md:py-2 rounded-lg font-mono text-xs md:text-sm
              ${darkMode ? 'bg-slate-950 text-pink-200 border-pink-700' : 'bg-white text-pink-900 border-pink-200'}
              border-2 focus:outline-none focus:ring-2 focus:ring-pink-400`}
          />
        </div>
      </div>

      {/* Quick Input Buttons */}
      <div className="grid grid-cols-2 gap-1.5 md:gap-2 mb-2 md:mb-3">
        <button
          onClick={() => insertBit('0')}
          className={`py-1.5 md:py-2 px-2 md:px-4 rounded-lg font-bold text-sm md:text-lg ${darkMode ? 'bg-slate-700 text-pink-200' : 'bg-white text-pink-900'} 
            border-2 ${darkMode ? 'border-pink-700' : 'border-pink-200'} hover:scale-105 transition-all duration-200`}
        >
          0
        </button>
        <button
          onClick={() => insertBit('1')}
          className={`py-1.5 md:py-2 px-2 md:px-4 rounded-lg font-bold text-sm md:text-lg ${darkMode ? 'bg-slate-700 text-pink-200' : 'bg-white text-pink-900'}
            border-2 ${darkMode ? 'border-pink-700' : 'border-pink-200'} hover:scale-105 transition-all duration-200`}
        >
          1
        </button>
      </div>

      {/* Operations */}
      <div className="grid grid-cols-5 gap-1 md:gap-1.5 mb-2 md:mb-3">
        {['+', '-', '×', '÷', 'AND', 'OR', 'XOR', 'NOT', '<<', '>>'].map((op) => (
          <button
            key={op}
            onClick={() => setOperation(op)}
            className={`py-1 md:py-1.5 px-1 md:px-2 rounded text-[10px] md:text-xs font-semibold transition-all duration-200
              ${operation === op
                ? `bg-gradient-to-br ${theme.primary} text-white shadow-lg scale-105`
                : `${darkMode ? 'bg-slate-700 text-pink-200' : 'bg-white text-pink-900'} border ${darkMode ? 'border-pink-700' : 'border-pink-200'} hover:scale-105`
              }`}
          >
            {op}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-1.5 md:gap-2 mb-2 md:mb-3">
        <button
          onClick={calculate}
          className={`py-1.5 md:py-2 px-2 md:px-4 rounded-lg text-xs md:text-sm font-semibold bg-gradient-to-br ${theme.primary} text-white shadow-lg hover:scale-105 transition-all duration-200`}
        >
          Calculate
        </button>
        <button
          onClick={clear}
          className="py-1.5 md:py-2 px-2 md:px-4 rounded-lg text-xs md:text-sm font-semibold bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-lg hover:scale-105 transition-all duration-200"
        >
          Clear
        </button>
      </div>

      {/* Result Display */}
      {result && (
        <div className={`p-2 md:p-3 rounded-lg ${darkMode ? 'bg-slate-950 border-pink-700' : 'bg-white border-pink-200'} border-2 animate-fade-in`}>
          <div className="text-[10px] md:text-xs font-semibold text-pink-600 dark:text-pink-400 mb-0.5">Result:</div>
          <div className="font-mono text-sm md:text-lg font-bold text-pink-700 dark:text-pink-300 break-all">
            {result}
          </div>
          <div className="text-[10px] md:text-xs text-pink-500 dark:text-pink-400 mt-0.5">
            Decimal: {decimalResult}
          </div>
        </div>
      )}

      {/* Helper Info */}
      <div className="mt-2 text-[10px] md:text-xs text-pink-500 dark:text-pink-400 text-center">
        💡 Supports: Arithmetic (+, -, ×, ÷), Bitwise (AND, OR, XOR, NOT), Shifts ({'<<, >>'})
      </div>
    </div>
  );
}

export default BinaryPanel;
