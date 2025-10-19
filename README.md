# ✨ Elegant Pink Calculator ✨

A beautiful, feature-rich calculator web application built with React, Vite, and Tailwind CSS. Features a stunning pink aesthetic with smooth animations, dark mode, scientific calculations, voice input, and more!

![Calculator Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=for-the-badge&logo=vite)

<img width="1897" height="527" alt="banner-calc" src="https://github.com/user-attachments/assets/5c3009cc-c177-4a3f-b242-bd0aa2edfad2" />

## 🌸 Features

### Core Functionality
- ✅ **Basic Calculator** - All standard operations (+, -, ×, ÷, %)
- 🔬 **Scientific Mode** - Advanced functions (sin, cos, tan, log, ln, √, x², π, e)
- � **Binary Calculator** - Binary arithmetic with bitwise operations (AND, OR, XOR, NOT, <<, >>)
- �📊 **History Panel** - Track your last 10 calculations with timestamps
- 🎙️ **Voice Input** - Speak your calculations naturally
- 🌓 **Dark/Light Mode** - Smooth theme transitions (Dark mode default)
- 🎨 **Theme Customizer** - Choose from 5 elegant themes:
  - ✨ Elegant (Default)
  - 💗 Default Pink
  - 🌸 Pastel Pink
  - 🔥 Hot Pink
  - 🍬 Bubblegum

### UI/UX Excellence
- ✨ **Refined Aesthetic** - Elegant design with sophisticated gradients
- 💫 **Interactive Buttons** - Ripple effects and smooth hover animations
- 🌈 **Animated Gradients** - Dynamic background effects
- 📱 **Fully Responsive** - Works beautifully on all screen sizes
- ⌨️ **Keyboard Support** - Full keyboard navigation and shortcuts
- ♿ **Accessible** - Keyboard navigation and screen reader support
- 🚫 **No Scrolling Required** - Everything fits perfectly in viewport

### Error Handling
- 😔 **Friendly Error Messages** - Cute animations for errors
- 🙈 **Division by Zero Protection**
- 🤔 **Invalid Input Detection**

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Start the development server**
```bash
npm run dev
```

3. **Open your browser**
Navigate to `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

The optimized files will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 🎮 Usage

### Basic Calculator
- Click number buttons to input digits
- Use operation buttons (+, -, ×, ÷) for calculations
- Press `=` to get results
- Press `C` to clear

### Scientific Mode
1. Click **🔬 Scientific** button
2. Access advanced functions:
   - Trigonometry: sin, cos, tan
   - Logarithms: log, ln
   - Powers: √, x²
   - Constants: π, e

### Binary Calculator Mode
1. Click **💻 Binary** button
2. Enter binary numbers (0s and 1s only)
3. Use quick input buttons or type directly
4. Perform operations:
   - Arithmetic: +, -, ×, ÷
   - Bitwise: AND, OR, XOR, NOT
   - Shifts: <<, >>
5. Results show both binary and decimal values

### Keyboard Shortcuts
- **Numbers (0-9)** - Input digits
- **Operators (+, -, *, /)** - Perform operations
- **Enter** or **=** - Calculate result
- **Escape** or **C** - Clear display
- **.** - Decimal point
- **Backspace** - Delete last digit

### Voice Input
1. Click the **🎙️** microphone button
2. Speak your calculation (e.g., "five plus three equals")
3. The calculator will process your input

### Theme Customization
1. Click the **🎨** paint icon
2. Select your preferred theme
3. Toggle between light and dark modes with **🌙/☀️**

### History Panel
1. Click **📊 Show History** to view recent calculations
2. Scroll through your calculation history
3. Click **Clear** to reset history

## 🛠️ Technology Stack

- **React 19.1** - UI library
- **Vite 7.1** - Build tool (with Rolldown)
- **Tailwind CSS 3.4** - Styling framework
- **PostCSS** - CSS processing
- **ESLint** - Code linting

## 📁 Project Structure

```
collab/
├── src/
│   ├── components/
│   │   ├── Button.jsx           # Reusable calculator button
│   │   ├── Display.jsx          # Calculator display screen
│   │   ├── ScientificPanel.jsx  # Scientific functions panel
│   │   ├── HistoryPanel.jsx     # Calculation history sidebar
│   │   ├── ThemeToggle.jsx      # Dark/light mode toggle
│   │   ├── ThemeCustomizer.jsx  # Theme selection panel
│   │   ├── VoiceInput.jsx       # Voice recognition component
│   │   └── ErrorModal.jsx       # Error popup component
│   ├── App.jsx                  # Main application component
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Global styles
├── public/                      # Static assets
├── index.html                   # HTML template
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── vite.config.js              # Vite configuration
└── package.json                # Dependencies
```

## 🎨 Customization

### Adding New Themes

Edit `App.jsx` and add to the `themes` object:

```javascript
const themes = {
  // ... existing themes
  myTheme: {
    primary: 'from-purple-300 to-purple-500',
    secondary: 'from-purple-200 to-purple-400',
    background: 'bg-gradient-to-br from-purple-50 via-violet-50 to-purple-100',
    darkBackground: 'bg-gradient-to-br from-purple-900 via-violet-900 to-purple-800',
  },
};
```

## 🌐 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Note:** Voice input requires browsers that support the Web Speech API (Chrome, Edge, Safari).

## 📝 Features Implemented

- [x] Interactive UI with smooth animations
- [x] Dark and light mode toggle
- [x] History panel
- [x] Scientific calculator mode
- [x] Voice input
- [x] Customizable themes (4 pink variants)
- [x] Smooth animations and transitions
- [x] Fully responsive design
- [x] Error handling with friendly messages

## 💖 Credits

**Made with 💖 by [Ridhi Rani Gupta](https://github.com/ridhiranigupta)**

Connect with me:
- 🐙 GitHub: [@ridhiranigupta](https://github.com/ridhiranigupta)

---

<div align="center">

**⭐ Enjoy calculating in style! ⭐**

Made with React ⚛️, Styled with Tailwind 💨, Powered by Vite ⚡

</div>

