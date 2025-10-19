import { useState } from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import { TbMathIntegral, TbMathFunction } from 'react-icons/tb';

function CalculusPanel({ darkMode, theme }) {
  const [expression, setExpression] = useState('');
  const [variable, setVariable] = useState('x');
  const [result, setResult] = useState('');
  const [operation, setOperation] = useState('derivative');

  const handleCalculate = () => {
    // This is a simplified implementation
    // In a real app, you'd use a library like math.js or algebrite
    try {
      if (!expression.trim()) {
        setResult('Please enter an expression');
        return;
      }
      
      if (operation === 'derivative') {
        setResult(`d/d${variable}(${expression}) = [Calculus Engine Required]`);
      } else if (operation === 'integral') {
        setResult(`∫(${expression})d${variable} = [Calculus Engine Required]`);
      } else if (operation === 'limit') {
        setResult(`lim(${expression}) = [Calculus Engine Required]`);
      }
    } catch (error) {
      setResult('Error: Invalid expression');
    }
  };

  return (
    <div className="mb-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-900 rounded-xl border-2 border-purple-200 dark:border-purple-700 shadow-lg animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <TbMathFunction className="text-2xl text-purple-600 dark:text-purple-400" />
        <h3 className="text-lg font-bold text-purple-700 dark:text-purple-300">
          Calculus Lab
          <span className="ml-2 text-xs px-2 py-0.5 bg-purple-200 dark:bg-purple-800 rounded-full">BETA</span>
        </h3>
      </div>

      {/* Operation Selector */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <button
          onClick={() => setOperation('derivative')}
          className={`p-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
            operation === 'derivative'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md scale-105'
              : 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 hover:scale-105'
          }`}
        >
          d/dx
        </button>
        <button
          onClick={() => setOperation('integral')}
          className={`p-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
            operation === 'integral'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md scale-105'
              : 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 hover:scale-105'
          }`}
        >
          ∫ dx
        </button>
        <button
          onClick={() => setOperation('limit')}
          className={`p-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
            operation === 'limit'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md scale-105'
              : 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 hover:scale-105'
          }`}
        >
          lim
        </button>
      </div>

      {/* Input Fields */}
      <div className="space-y-2 mb-3">
        <div>
          <label className="text-xs font-medium text-purple-600 dark:text-purple-400 mb-1 block">
            Expression f({variable}):
          </label>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder={`e.g., ${variable}^2 + 2*${variable} + 1`}
            className="w-full px-3 py-2 rounded-lg border-2 border-purple-200 dark:border-purple-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-xs font-medium text-purple-600 dark:text-purple-400 mb-1 block">
              Variable:
            </label>
            <input
              type="text"
              value={variable}
              onChange={(e) => setVariable(e.target.value)}
              maxLength={1}
              className="w-full px-3 py-2 rounded-lg border-2 border-purple-200 dark:border-purple-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleCalculate}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold text-sm hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Calculate
            </button>
          </div>
        </div>
      </div>

      {/* Result Display */}
      {result && (
        <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border-2 border-purple-200 dark:border-purple-700 min-h-[60px]">
          <p className="text-xs font-medium text-purple-600 dark:text-purple-400 mb-1">Result:</p>
          <p className="text-sm text-gray-800 dark:text-gray-200 font-mono break-words">
            {result}
          </p>
        </div>
      )}
    </div>
  );
}

export default CalculusPanel;
