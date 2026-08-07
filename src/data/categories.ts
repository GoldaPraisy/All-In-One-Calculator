// Category and calculator data definitions
export interface CalcInfo {
  id: string;
  name: string;
  icon: string;
  desc: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  calcs: CalcInfo[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'math',
    name: 'Math',
    icon: '🔢',
    color: '#00bfff',
    calcs: [
      { id: 'basic', name: 'Basic Calculator', icon: '➕', desc: 'Add, subtract, multiply, divide', categoryId: 'math' },
      { id: 'scientific', name: 'Scientific Calculator', icon: '🔬', desc: 'Trig, log, powers, roots, factorials', categoryId: 'math' },
      { id: 'graphing', name: 'Graphing Calculator', icon: '📈', desc: 'Plot equations and functions', categoryId: 'math' },
      { id: 'percentage', name: 'Percentage Calculator', icon: '%', desc: 'Percentages, increase/decrease, discounts', categoryId: 'math' },
      { id: 'fraction', name: 'Fraction Calculator', icon: '½', desc: 'Add, subtract, multiply, divide fractions', categoryId: 'math' },
      { id: 'statistics', name: 'Statistics Calculator', icon: '📊', desc: 'Mean, median, mode, variance, SD', categoryId: 'math' },
      { id: 'probability', name: 'Probability Calculator', icon: '🎲', desc: 'Combinations, permutations, probability', categoryId: 'math' },
      { id: 'algebra', name: 'Algebra Calculator', icon: '🔣', desc: 'Solve equations and expressions', categoryId: 'math' },
    ],
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: '💰',
    color: '#44dd88',
    calcs: [
      { id: 'emi', name: 'EMI Calculator', icon: '🏦', desc: 'Monthly loan payment calculator', categoryId: 'finance' },
      { id: 'loan', name: 'Loan Calculator', icon: '💳', desc: 'Full loan breakdown with schedule', categoryId: 'finance' },
      { id: 'gst', name: 'GST / Tax Calculator', icon: '🧾', desc: 'GST, VAT, sales tax calculation', categoryId: 'finance' },
      { id: 'simple-interest', name: 'Simple Interest', icon: '📋', desc: 'P × R × T interest calculation', categoryId: 'finance' },
      { id: 'compound-interest', name: 'Compound Interest', icon: '📈', desc: 'Compounding interest over time', categoryId: 'finance' },
      { id: 'savings', name: 'Savings Calculator', icon: '🐷', desc: 'Future value of periodic savings', categoryId: 'finance' },
      { id: 'salary', name: 'Salary Calculator', icon: '💼', desc: 'CTC to take-home with deductions', categoryId: 'finance' },
      { id: 'discount', name: 'Discount Calculator', icon: '🏷️', desc: 'Sale price and savings amount', categoryId: 'finance' },
      { id: 'tip', name: 'Tip Calculator', icon: '🍽️', desc: 'Tip amount and bill split', categoryId: 'finance' },
    ],
  },
  {
    id: 'health',
    name: 'Health',
    icon: '❤️',
    color: '#ff6688',
    calcs: [
      { id: 'bmi', name: 'BMI Calculator', icon: '⚖️', desc: 'Body Mass Index from height & weight', categoryId: 'health' },
      { id: 'age', name: 'Age Calculator', icon: '🎂', desc: 'Exact age from date of birth', categoryId: 'health' },
      { id: 'calorie', name: 'Calorie Calculator', icon: '🔥', desc: 'Daily calorie requirement (TDEE)', categoryId: 'health' },
    ],
  },
  {
    id: 'conversion',
    name: 'Conversion',
    icon: '🔄',
    color: '#ffaa44',
    calcs: [
      { id: 'length', name: 'Length Converter', icon: '📏', desc: 'mm, cm, m, km, in, ft, miles', categoryId: 'conversion' },
      { id: 'weight', name: 'Weight Converter', icon: '⚖️', desc: 'mg, g, kg, lb, oz, ton', categoryId: 'conversion' },
      { id: 'temperature', name: 'Temperature Converter', icon: '🌡️', desc: 'Celsius, Fahrenheit, Kelvin', categoryId: 'conversion' },
      { id: 'area', name: 'Area Converter', icon: '▪️', desc: 'm², km², ft², acres, hectares', categoryId: 'conversion' },
      { id: 'volume', name: 'Volume Converter', icon: '🧊', desc: 'L, mL, gallon, fl oz, m³', categoryId: 'conversion' },
      { id: 'speed', name: 'Speed Converter', icon: '💨', desc: 'km/h, mph, m/s, knots', categoryId: 'conversion' },
      { id: 'currency', name: 'Currency Converter', icon: '💱', desc: '30+ world currencies (static rates)', categoryId: 'conversion' },
    ],
  },
  {
    id: 'datetime',
    name: 'Date & Time',
    icon: '📅',
    color: '#aa88ff',
    calcs: [
      { id: 'date-diff', name: 'Date Difference', icon: '📆', desc: 'Days, weeks, months between dates', categoryId: 'datetime' },
      { id: 'time-calc', name: 'Time Calculator', icon: '⏱️', desc: 'Add or subtract HH:MM:SS', categoryId: 'datetime' },
      { id: 'age-detail', name: 'Age in Detail', icon: '🕰️', desc: 'Exact age in years, months, days, hours', categoryId: 'datetime' },
    ],
  },
  {
    id: 'engineering',
    name: 'Engineering',
    icon: '⚙️',
    color: '#ff8844',
    calcs: [
      { id: 'physics', name: 'Physics Calculator', icon: '⚡', desc: 'Force, velocity, energy, momentum', categoryId: 'engineering' },
      { id: 'electrical', name: 'Electrical Calculator', icon: '🔌', desc: "Ohm's law, power, resistance", categoryId: 'engineering' },
      { id: 'construction', name: 'Construction Calculator', icon: '🏗️', desc: 'Concrete, bricks, tiles, paint', categoryId: 'engineering' },
    ],
  },
  {
    id: 'programming',
    name: 'Programming',
    icon: '💻',
    color: '#88eeaa',
    calcs: [
      { id: 'binary', name: 'Binary Calculator', icon: '0️⃣', desc: 'Binary arithmetic & conversions', categoryId: 'programming' },
      { id: 'hexadecimal', name: 'Hex Calculator', icon: '🔢', desc: 'Hexadecimal arithmetic & conversions', categoryId: 'programming' },
      { id: 'octal', name: 'Octal Calculator', icon: '8️⃣', desc: 'Octal arithmetic & conversions', categoryId: 'programming' },
      { id: 'programmer', name: 'Programmer Calculator', icon: '💾', desc: 'Base conversion + bitwise ops', categoryId: 'programming' },
      { id: 'matrix', name: 'Matrix Calculator', icon: '🔲', desc: 'Add, multiply, determinant, inverse', categoryId: 'programming' },
    ],
  },
  {
    id: 'advanced',
    name: 'Advanced Math',
    icon: '∫',
    color: '#ffdd44',
    calcs: [
      { id: 'derivative', name: 'Derivative Calculator', icon: "d/dx", desc: 'Symbolic differentiation of functions', categoryId: 'advanced' },
      { id: 'integral', name: 'Integral Calculator', icon: '∫', desc: 'Definite & indefinite integrals', categoryId: 'advanced' },
      { id: 'equation-solver', name: 'Equation Solver', icon: '🔍', desc: 'Solve linear, quadratic, higher-degree', categoryId: 'advanced' },
      { id: 'geometry', name: 'Geometry Calculator', icon: '📐', desc: 'Area, perimeter, angles, volumes', categoryId: 'advanced' },
    ],
  },
];

export const ALL_CALCS: CalcInfo[] = CATEGORIES.flatMap(c => c.calcs);
