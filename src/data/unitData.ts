// Unit conversion data

export interface UnitDef { label: string; toBase: number }

export const LENGTH_UNITS: UnitDef[] = [
  { label: 'Millimeter (mm)', toBase: 0.001 },
  { label: 'Centimeter (cm)', toBase: 0.01 },
  { label: 'Meter (m)', toBase: 1 },
  { label: 'Kilometer (km)', toBase: 1000 },
  { label: 'Inch (in)', toBase: 0.0254 },
  { label: 'Foot (ft)', toBase: 0.3048 },
  { label: 'Yard (yd)', toBase: 0.9144 },
  { label: 'Mile (mi)', toBase: 1609.344 },
  { label: 'Nautical Mile', toBase: 1852 },
];

export const WEIGHT_UNITS: UnitDef[] = [
  { label: 'Milligram (mg)', toBase: 0.000001 },
  { label: 'Gram (g)', toBase: 0.001 },
  { label: 'Kilogram (kg)', toBase: 1 },
  { label: 'Metric Ton (t)', toBase: 1000 },
  { label: 'Ounce (oz)', toBase: 0.0283495 },
  { label: 'Pound (lb)', toBase: 0.453592 },
  { label: 'Stone (st)', toBase: 6.35029 },
  { label: 'US Ton', toBase: 907.185 },
];

export const AREA_UNITS: UnitDef[] = [
  { label: 'Square mm (mm²)', toBase: 0.000001 },
  { label: 'Square cm (cm²)', toBase: 0.0001 },
  { label: 'Square m (m²)', toBase: 1 },
  { label: 'Square km (km²)', toBase: 1000000 },
  { label: 'Hectare (ha)', toBase: 10000 },
  { label: 'Acre', toBase: 4046.86 },
  { label: 'Square ft (ft²)', toBase: 0.092903 },
  { label: 'Square yard (yd²)', toBase: 0.836127 },
  { label: 'Square mile (mi²)', toBase: 2589988 },
];

export const VOLUME_UNITS: UnitDef[] = [
  { label: 'Milliliter (mL)', toBase: 0.001 },
  { label: 'Centiliter (cL)', toBase: 0.01 },
  { label: 'Deciliter (dL)', toBase: 0.1 },
  { label: 'Liter (L)', toBase: 1 },
  { label: 'Cubic Meter (m³)', toBase: 1000 },
  { label: 'Fluid Ounce (fl oz)', toBase: 0.0295735 },
  { label: 'Cup (US)', toBase: 0.236588 },
  { label: 'Pint (US)', toBase: 0.473176 },
  { label: 'Quart (US)', toBase: 0.946353 },
  { label: 'Gallon (US)', toBase: 3.78541 },
  { label: 'Gallon (UK)', toBase: 4.54609 },
];

export const SPEED_UNITS: UnitDef[] = [
  { label: 'Meter/second (m/s)', toBase: 1 },
  { label: 'Km/hour (km/h)', toBase: 0.277778 },
  { label: 'Mile/hour (mph)', toBase: 0.44704 },
  { label: 'Foot/second (ft/s)', toBase: 0.3048 },
  { label: 'Knot', toBase: 0.514444 },
  { label: 'Mach (at sea level)', toBase: 340.29 },
];

export const convertTemperature = (value: number, from: string, to: string): number => {
  let celsius: number;
  switch (from) {
    case 'C': celsius = value; break;
    case 'F': celsius = (value - 32) * 5 / 9; break;
    case 'K': celsius = value - 273.15; break;
    case 'R': celsius = (value - 491.67) * 5 / 9; break;
    default: celsius = value;
  }
  switch (to) {
    case 'C': return celsius;
    case 'F': return celsius * 9 / 5 + 32;
    case 'K': return celsius + 273.15;
    case 'R': return (celsius + 273.15) * 9 / 5;
    default: return celsius;
  }
};

export interface CurrencyDef {
  country: string;
  name: string;
  code: string;
  symbol: string;
  flag: string;
  rate: number; // relative to USD = 1.0
}

export const WORLD_CURRENCIES: CurrencyDef[] = [
  { country: 'India', name: 'Indian Rupee', code: 'INR', symbol: '₹', flag: '🇮🇳', rate: 83.5 },
  { country: 'United States', name: 'US Dollar', code: 'USD', symbol: '$', flag: '🇺🇸', rate: 1.0 },
  { country: 'Eurozone', name: 'Euro', code: 'EUR', symbol: '€', flag: '🇪🇺', rate: 0.92 },
  { country: 'United Kingdom', name: 'Pound Sterling', code: 'GBP', symbol: '£', flag: '🇬🇧', rate: 0.79 },
  { country: 'Japan', name: 'Japanese Yen', code: 'JPY', symbol: '¥', flag: '🇯🇵', rate: 149.5 },
  { country: 'China', name: 'Chinese Yuan', code: 'CNY', symbol: '¥', flag: '🇨🇳', rate: 7.24 },
  { country: 'Canada', name: 'Canadian Dollar', code: 'CAD', symbol: '$', flag: '🇨🇦', rate: 1.36 },
  { country: 'Australia', name: 'Australian Dollar', code: 'AUD', symbol: '$', flag: '🇦🇺', rate: 1.53 },
  { country: 'New Zealand', name: 'New Zealand Dollar', code: 'NZD', symbol: '$', flag: '🇳🇿', rate: 1.63 },
  { country: 'Switzerland', name: 'Swiss Franc', code: 'CHF', symbol: 'Fr', flag: '🇨🇭', rate: 0.88 },
  { country: 'Singapore', name: 'Singapore Dollar', code: 'SGD', symbol: '$', flag: '🇸🇬', rate: 1.34 },
  { country: 'Hong Kong', name: 'Hong Kong Dollar', code: 'HKD', symbol: '$', flag: '🇭🇰', rate: 7.82 },
  { country: 'South Korea', name: 'South Korean Won', code: 'KRW', symbol: '₩', flag: '🇰🇷', rate: 1325.0 },
  { country: 'Thailand', name: 'Thai Baht', code: 'THB', symbol: '฿', flag: '🇹🇭', rate: 35.2 },
  { country: 'Malaysia', name: 'Malaysian Ringgit', code: 'MYR', symbol: 'RM', flag: '🇲🇾', rate: 4.69 },
  { country: 'Indonesia', name: 'Indonesian Rupiah', code: 'IDR', symbol: 'Rp', flag: '🇮🇩', rate: 15650.0 },
  { country: 'Philippines', name: 'Philippine Peso', code: 'PHP', symbol: '₱', flag: '🇵🇭', rate: 56.8 },
  { country: 'Vietnam', name: 'Vietnamese Dong', code: 'VND', symbol: '₫', flag: '🇻🇳', rate: 24350.0 },
  { country: 'UAE', name: 'UAE Dirham', code: 'AED', symbol: 'د.إ', flag: '🇦🇪', rate: 3.67 },
  { country: 'Saudi Arabia', name: 'Saudi Riyal', code: 'SAR', symbol: '﷼', flag: '🇸🇦', rate: 3.75 },
  { country: 'Qatar', name: 'Qatari Riyal', code: 'QAR', symbol: '﷼', flag: '🇶🇦', rate: 3.64 },
  { country: 'Kuwait', name: 'Kuwaiti Dinar', code: 'KWD', symbol: 'د.ك', flag: '🇰🇼', rate: 0.31 },
  { country: 'Bahrain', name: 'Bahraini Dinar', code: 'BHD', symbol: '.د.ب', flag: '🇧🇭', rate: 0.38 },
  { country: 'Oman', name: 'Omani Rial', code: 'OMR', symbol: '﷼', flag: '🇴🇲', rate: 0.385 },
  { country: 'South Africa', name: 'South African Rand', code: 'ZAR', symbol: 'R', flag: '🇿🇦', rate: 18.63 },
  { country: 'Russia', name: 'Russian Ruble', code: 'RUB', symbol: '₽', flag: '🇷🇺', rate: 90.5 },
  { country: 'Brazil', name: 'Brazilian Real', code: 'BRL', symbol: 'R$', flag: '🇧🇷', rate: 4.97 },
  { country: 'Mexico', name: 'Mexican Peso', code: 'MXN', symbol: '$', flag: '🇲🇽', rate: 17.15 },
  { country: 'Türkiye', name: 'Turkish Lira', code: 'TRY', symbol: '₺', flag: '🇹🇷', rate: 32.1 },
  { country: 'Israel', name: 'Israeli New Shekel', code: 'ILS', symbol: '₪', flag: '🇮🇱', rate: 3.66 },
  { country: 'Norway', name: 'Norwegian Krone', code: 'NOK', symbol: 'kr', flag: '🇳🇴', rate: 10.56 },
  { country: 'Sweden', name: 'Swedish Krona', code: 'SEK', symbol: 'kr', flag: '🇸🇪', rate: 10.42 },
  { country: 'Denmark', name: 'Danish Krone', code: 'DKK', symbol: 'kr', flag: '🇩🇰', rate: 6.89 },
  { country: 'Poland', name: 'Polish Złoty', code: 'PLN', symbol: 'zł', flag: '🇵🇱', rate: 3.96 },
  { country: 'Czechia', name: 'Czech Koruna', code: 'CZK', symbol: 'Kč', flag: '🇨🇿', rate: 23.1 },
  { country: 'Hungary', name: 'Hungarian Forint', code: 'HUF', symbol: 'Ft', flag: '🇭🇺', rate: 358.0 },
  { country: 'Romania', name: 'Romanian Leu', code: 'RON', symbol: 'lei', flag: '🇷🇴', rate: 4.58 },
  { country: 'Ukraine', name: 'Ukrainian Hryvnia', code: 'UAH', symbol: '₴', flag: '🇺🇦', rate: 38.5 },
  { country: 'Pakistan', name: 'Pakistani Rupee', code: 'PKR', symbol: '₨', flag: '🇵🇰', rate: 278.5 },
  { country: 'Bangladesh', name: 'Bangladeshi Taka', code: 'BDT', symbol: '৳', flag: '🇧🇩', rate: 109.8 },
  { country: 'Sri Lanka', name: 'Sri Lankan Rupee', code: 'LKR', symbol: 'Rs', flag: '🇱🇰', rate: 305.0 },
  { country: 'Nepal', name: 'Nepalese Rupee', code: 'NPR', symbol: 'Rs', flag: '🇳🇵', rate: 133.5 },
  { country: 'Myanmar', name: 'Myanmar Kyat', code: 'MMK', symbol: 'K', flag: '🇲🇲', rate: 2100.0 },
  { country: 'Afghanistan', name: 'Afghan Afghani', code: 'AFN', symbol: '؋', flag: '🇦🇫', rate: 71.2 },
  { country: 'Iran', name: 'Iranian Rial', code: 'IRR', symbol: '﷼', flag: '🇮🇷', rate: 42000.0 },
  { country: 'Iraq', name: 'Iraqi Dinar', code: 'IQD', symbol: 'ع.د', flag: '🇮🇶', rate: 1310.0 },
  { country: 'Egypt', name: 'Egyptian Pound', code: 'EGP', symbol: '£', flag: '🇪🇬', rate: 47.8 },
  { country: 'Nigeria', name: 'Nigerian Naira', code: 'NGN', symbol: '₦', flag: '🇳🇬', rate: 1450.0 },
  { country: 'Kenya', name: 'Kenyan Shilling', code: 'KES', symbol: 'KSh', flag: '🇰🇪', rate: 131.0 },
  { country: 'Ghana', name: 'Ghanaian Cedi', code: 'GHS', symbol: '₵', flag: '🇬🇭', rate: 13.8 },
  { country: 'Morocco', name: 'Moroccan Dirham', code: 'MAD', symbol: 'د.م.', flag: '🇲🇦', rate: 10.05 },
  { country: 'Tunisia', name: 'Tunisian Dinar', code: 'TND', symbol: 'د.ت', flag: '🇹🇳', rate: 3.12 },
  { country: 'Argentina', name: 'Argentine Peso', code: 'ARS', symbol: '$', flag: '🇦🇷', rate: 865.0 },
  { country: 'Chile', name: 'Chilean Peso', code: 'CLP', symbol: '$', flag: '🇨🇱', rate: 940.0 },
  { country: 'Colombia', name: 'Colombian Peso', code: 'COP', symbol: '$', flag: '🇨🇴', rate: 3880.0 },
  { country: 'Peru', name: 'Peruvian Sol', code: 'PEN', symbol: 'S/', flag: '🇵🇪', rate: 3.72 },
  { country: 'Uruguay', name: 'Uruguayan Peso', code: 'UYU', symbol: '$U', flag: '🇺🇾', rate: 38.5 },
  { country: 'Bolivia', name: 'Bolivian Boliviano', code: 'BOB', symbol: 'Bs', flag: '🇧🇴', rate: 6.91 },
  { country: 'Paraguay', name: 'Paraguayan Guaraní', code: 'PYG', symbol: '₲', flag: '🇵🇾', rate: 7420.0 },
  { country: 'Iceland', name: 'Icelandic Króna', code: 'ISK', symbol: 'kr', flag: '🇮🇸', rate: 138.5 },
  { country: 'Fiji', name: 'Fijian Dollar', code: 'FJD', symbol: '$', flag: '🇫🇯', rate: 2.24 },
  { country: 'Papua New Guinea', name: 'Kina', code: 'PGK', symbol: 'K', flag: '🇵🇬', rate: 3.82 },
  { country: 'Vanuatu', name: 'Vatu', code: 'VUV', symbol: 'VT', flag: '🇻🇺', rate: 119.5 },
  { country: 'Samoa', name: 'Tala', code: 'WST', symbol: 'T', flag: '🇼🇸', rate: 2.75 },
  { country: 'Tonga', name: 'Paʻanga', code: 'TOP', symbol: 'T$', flag: '🇹🇴', rate: 2.36 },
];

export const CURRENCY_RATES: Record<string, { name: string; symbol: string; rate: number }> =
  WORLD_CURRENCIES.reduce((acc, curr) => {
    acc[curr.code] = { name: `${curr.flag} ${curr.country} (${curr.name})`, symbol: curr.symbol, rate: curr.rate };
    return acc;
  }, {} as Record<string, { name: string; symbol: string; rate: number }>);
