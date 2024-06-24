import { alpha, PaletteColorOptions, PaletteOptions } from '@mui/material';

const createGradient = (color1: string, color2: string) => {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

const PRIMARY: PaletteColorOptions = {
  lighter: '#C8FACD',
  light: '#5BE584',
  main: '#0C64E7',
  dark: '#0946A1',
  darker: '#005249',
};

const SECONDARY: PaletteColorOptions = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#F3F7FE',
  dark: '#C4D4EC',
  darker: '#091A7A',
};

const INFO: PaletteColorOptions = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
};

const SUCCESS: PaletteColorOptions = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
};

const WARNING: PaletteColorOptions = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
};

const ERROR: PaletteColorOptions = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
};

const GREY: PaletteColorOptions = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

const COMMON: PaletteOptions = {
  common: {black: '#000', white: '#fff'},
  primary: {...PRIMARY, contrastText: '#fff'},
  secondary: {...SECONDARY, contrastText: '#fff'},
  info: {...INFO, contrastText: '#fff'},
  success: {...SUCCESS, contrastText: GREY[800]},
  warning: {...WARNING, contrastText: GREY[800]},
  error: {...ERROR, contrastText: '#fff'},
  grey: GREY,
  gradients: {
    primary: createGradient(PRIMARY.light!, PRIMARY.main),
    info: createGradient(INFO.light!, INFO.main),
    success: createGradient(SUCCESS.light!, SUCCESS.main),
    warning: createGradient(WARNING.light!, WARNING.main),
    error: createGradient(ERROR.light!, ERROR.main),
  },
  chart: {
    violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
    blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
    green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
    yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
    red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
  },
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export const palette: { light: PaletteOptions, dark: PaletteOptions } = {
  light: {
    ...COMMON,
    mode: 'light',
    text: {primary: '#37354B', secondary: GREY[600], disabled: GREY[500]},
    background: {
      paper: '#fff',
      default: '#fff',
      strokeBg: '#EAECF0',
      lightStrokeBg: '#F3F7FE',
      primaryBg: "#BFCBE1",
      graybg: 'F1F1F1'
    },
    action: {active: GREY[600], ...COMMON.action},
  },
  dark: {
    ...COMMON,
    mode: 'dark',
    text: {primary: '#fff', secondary: GREY[500], disabled: GREY[600]},
    background: {
      paper: GREY[800],
      default: GREY[900],
      strokeBg: '#EAECF0',
      lightStrokeBg: '#F3F7FE',
      primaryBg: "#BFCBE1",
      graybg: 'F1F1F1'
    },
    action: {active: GREY[500], ...COMMON.action},
  },
} as const;
