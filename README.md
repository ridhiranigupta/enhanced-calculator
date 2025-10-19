# Enhanced Calculator

Minimal, easy-to-use calculator with extended functionality for expressions and scientific operations.

## Short description
A small expression evaluator supporting arithmetic, parentheses, operator precedence, memory/history, and common scientific functions.

## Features
- Basic arithmetic: +, -, *, /
- Operator precedence and parentheses
- Scientific functions: sin, cos, tan, log, ln, exp, sqrt, pow
- Constants: pi, e
- Memory (store/recall) and operation history
- Evaluate complex expressions in one line
- Minimal CLI and library usage (adjust to project entrypoint)

## Install
Clone the repository and install any dependencies listed in the project (e.g., requirements.txt):

git clone https://github.com/ridhiranigupta/enhanced-calculator.git
cd enhanced-calculator
# install dependencies if any:
# pip install -r requirements.txt

## Usage
Examples (adjust commands to the repository's actual entrypoints):

- Evaluate an expression (CLI):
  python -m enhanced_calculator "2 + 3 * (4 - 1)"

- Use as a library:
  from enhanced_calculator import evaluate
  result = evaluate("sin(pi / 2) + log(10)")
  print(result)

- Memory & history (conceptual):
  - store(value), recall(), history() — check implementation for exact function names.

## Contributing
Small, focused contributions welcome. Please open an issue or a pull request describing changes.

## License
Include your chosen license file (e.g., MIT). If none is included, add one or specify project license.
