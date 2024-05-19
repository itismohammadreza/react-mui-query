import { locales } from "@theme/theme";

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

export type Locale = keyof typeof locales;

interface GradientsPaletteOptions {
  primary: string;
  info: string;
  success: string;
  warning: string;
  error: string;
}

interface ChartPaletteOptions {
  violet: string[];
  blue: string[];
  green: string[];
  yellow: string[];
  red: string[];
}

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    primaryBg: string;
    graybg: string;
    strokeBg: string;
    lightStrokeBg: string
  }

  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }

  interface PaletteColor {
    lighter: string;
    darker: string;
  }

  interface Palette {
    gradients: GradientsPaletteOptions;
    chart: ChartPaletteOptions;
  }

  interface PaletteOptions {
    gradients: GradientsPaletteOptions;
    chart: ChartPaletteOptions;
  }
}

declare module '@mui/material' {
  interface Color {
    0: string;
    500_8: string;
    500_12: string;
    500_16: string;
    500_24: string;
    500_32: string;
    500_48: string;
    500_56: string;
    500_80: string;
  }
}
