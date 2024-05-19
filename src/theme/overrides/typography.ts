interface FontFace {
  name: string;
  path: string;
  weight: string;
  unicodeRange: string;
}

const pxToRem = (value: number) => {
  return `${value / 16}rem`;
}

const responsiveFontSizes = ({sm, md, lg}: { sm: number; md: number; lg: number }) => {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

const generateFonts = (...families: FontFace[]) => {
  const getFontFace = (family: FontFace) => {
    const {name, path, weight, unicodeRange} = family;
    return `
    @font-face {
      font-family: ${name};
      font-weight: ${weight};
      font-style: normal;
      font-display: swap;
      src: url("${path}") format("woff2");
      unicode-range: ${unicodeRange};
    };`
  }

  let result = ``;
  families.forEach(f => {
    result += getFontFace(f);
  })
  return result;
}

const persianUnicodeRange = 'U+20-21, U+24-25, U+27-3A, U+3C-3E, U+5B-5F, U+7C, U+A0, U+A9, U+AB, U+BB, U+609, U+60C, U+61B, U+61F, U+621-624, U+626-63A, U+641-642, U+644-648, U+64B-64D, U+651, U+654, U+66A-66C, U+67E, U+686, U+698, U+6A9, U+6AF, U+6CC, U+6F0-6F9, U+200E, U+2010-2011, U+2026, U+2030, U+2039-203A, U+20AC, U+2212';
const latinUnicodeRange = 'U+20-5F, U+61-7A, U+7C, U+A0, U+A7, U+A9, U+2010-2011, U+2013-2014, U+2018-2019, U+201C-201D, U+2020-2021, U+2026, U+2030, U+2032-2033, U+20AC';
const iransansFD: FontFace[] = [
  {
    name: 'iransans',
    path: '/fonts/iran-sans/farsi-digits/IranSans-FD-ExtraLight.woff2',
    weight: '200',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'iransans',
    path: '/fonts/iran-sans/farsi-digits/IranSans-FD-Light.woff2',
    weight: '300',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'iransans',
    path: '/fonts/iran-sans/farsi-digits/IranSans-FD-Regular.woff2',
    weight: 'normal',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'iransans',
    path: '/fonts/iran-sans/farsi-digits/IranSans-FD-Medium.woff2',
    weight: '500',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'iransans',
    path: '/fonts/iran-sans/farsi-digits/IranSans-FD-Bold.woff2',
    weight: 'bold',
    unicodeRange: persianUnicodeRange
  }
]
const iransansPlain: FontFace[] = [
  {
    name: 'iransans',
    path: '/fonts/iran-sans/plain/IranSans-FD-ExtraLight.woff2',
    weight: '200',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'iransans',
    path: '/fonts/iran-sans/plain/IranSans-FD-Light.woff2',
    weight: '300',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'iransans',
    path: '/fonts/iran-sans/plain/IranSans-FD-Regular.woff2',
    weight: 'normal',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'iransans',
    path: '/fonts/iran-sans/plain/IranSans-FD-Medium.woff2',
    weight: '500',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'iransans',
    path: '/fonts/iran-sans/plain/IranSans-FD-Bold.woff2',
    weight: 'bold',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'iransans',
    path: '/fonts/iran-sans/plain/IranSans-FD-Black.woff2',
    weight: '900',
    unicodeRange: persianUnicodeRange
  }
]
const vazirmatnFD: FontFace[] = [
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/farsi-digits/Vazirmatn-FD-Thin.woff2',
    weight: '100',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/farsi-digits/Vazirmatn-FD-ExtraLight.woff2',
    weight: '200',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/farsi-digits/Vazirmatn-FD-Light.woff2',
    weight: '300',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/farsi-digits/Vazirmatn-FD-Regular.woff2',
    weight: '400',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/farsi-digits/Vazirmatn-FD-Medium.woff2',
    weight: '500',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/farsi-digits/Vazirmatn-FD-SemiBold.woff2',
    weight: '600',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/farsi-digits/Vazirmatn-FD-Bold.woff2',
    weight: '700',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/farsi-digits/Vazirmatn-FD-ExtraBold.woff2',
    weight: '800',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/farsi-digits/Vazirmatn-FD-Black.woff2',
    weight: '900',
    unicodeRange: persianUnicodeRange
  }
]
const vazirmatnFDNL: FontFace[] = [
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/farsi-digits-non-latin/Vazirmatn-FD-NL-Thin.woff2',
    weight: '100',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/farsi-digits-non-latin/Vazirmatn-FD-NL-ExtraLight.woff2',
    weight: '200',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/farsi-digits-non-latin/Vazirmatn-FD-NL-Light.woff2',
    weight: '300',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/farsi-digits-non-latin/Vazirmatn-FD-NL-Regular.woff2',
    weight: '400',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/farsi-digits-non-latin/Vazirmatn-FD-NL-Medium.woff2',
    weight: '500',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/farsi-digits-non-latin/Vazirmatn-FD-NL-SemiBold.woff2',
    weight: '600',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/farsi-digits-non-latin/Vazirmatn-FD-NL-Bold.woff2',
    weight: '700',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/farsi-digits-non-latin/Vazirmatn-FD-NL-ExtraBold.woff2',
    weight: '800',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/farsi-digits-non-latin/Vazirmatn-FD-NL-Black.woff2',
    weight: '900',
    unicodeRange: persianUnicodeRange
  }
]
const vazirmatnNL: FontFace[] = [
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/non-latin/Vazirmatn-NL-Thin.woff2',
    weight: '100',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/non-latin/Vazirmatn-NL-ExtraLight.woff2',
    weight: '200',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/non-latin/Vazirmatn-NL-Light.woff2',
    weight: '300',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/non-latin/Vazirmatn-NL-Regular.woff2',
    weight: '400',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/non-latin/Vazirmatn-NL-Medium.woff2',
    weight: '500',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/non-latin/Vazirmatn-NL-SemiBold.woff2',
    weight: '600',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/non-latin/Vazirmatn-NL-Bold.woff2',
    weight: '700',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/non-latin/Vazirmatn-NL-ExtraBold.woff2',
    weight: '800',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/non-latin/Vazirmatn-NL-Black.woff2',
    weight: '900',
    unicodeRange: persianUnicodeRange
  }
]
const vazirmatnPlain: FontFace[] = [
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/plain/Vazirmatn-Thin.woff2',
    weight: '100',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/plain/Vazirmatn-ExtraLight.woff2',
    weight: '200',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/plain/Vazirmatn-Light.woff2',
    weight: '300',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/plain/Vazirmatn-Regular.woff2',
    weight: '400',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/plain/Vazirmatn-Medium.woff2',
    weight: '500',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/plain/Vazirmatn-SemiBold.woff2',
    weight: '600',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/plain/Vazirmatn-Bold.woff2',
    weight: '700',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/plain/Vazirmatn-ExtraBold.woff2',
    weight: '800',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn/plain/Vazirmatn-Black.woff2',
    weight: '900',
    unicodeRange: persianUnicodeRange
  }
]
const vazirmatnRDFD: FontFace[] = [
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/farsi-digits/woff2-RD/Vazirmatn-FD-Thin.woff2',
    weight: '100',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/farsi-digits/woff2-RD/Vazirmatn-FD-ExtraLight.woff2',
    weight: '200',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/farsi-digits/woff2-RD/Vazirmatn-FD-Light.woff2',
    weight: '300',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/farsi-digits/woff2-RD/Vazirmatn-FD-Regular.woff2',
    weight: '400',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/farsi-digits/woff2-RD/Vazirmatn-FD-Medium.woff2',
    weight: '500',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/farsi-digits/woff2-RD/Vazirmatn-FD-SemiBold.woff2',
    weight: '600',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/farsi-digits/woff2-RD/Vazirmatn-FD-Bold.woff2',
    weight: '700',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/farsi-digits/woff2-RD/Vazirmatn-FD-ExtraBold.woff2',
    weight: '800',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/farsi-digits/woff2-RD/Vazirmatn-FD-Black.woff2',
    weight: '900',
    unicodeRange: persianUnicodeRange
  }
]
const vazirmatnRDFDNL: FontFace[] = [
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/farsi-digits-non-RD-latin/Vazirmatn-FD-NL-Thin.woff2',
    weight: '100',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/farsi-digits-non-RD-latin/Vazirmatn-FD-NL-ExtraLight.woff2',
    weight: '200',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/farsi-digits-non-RD-latin/Vazirmatn-FD-NL-Light.woff2',
    weight: '300',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/farsi-digits-non-RD-latin/Vazirmatn-FD-NL-Regular.woff2',
    weight: '400',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/farsi-digits-non-RD-latin/Vazirmatn-FD-NL-Medium.woff2',
    weight: '500',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/farsi-digits-non-RD-latin/Vazirmatn-FD-NL-SemiBold.woff2',
    weight: '600',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/farsi-digits-non-RD-latin/Vazirmatn-FD-NL-Bold.woff2',
    weight: '700',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/farsi-digits-non-RD-latin/Vazirmatn-FD-NL-ExtraBold.woff2',
    weight: '800',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/farsi-digits-non-RD-latin/Vazirmatn-FD-NL-Black.woff2',
    weight: '900',
    unicodeRange: persianUnicodeRange
  }
]
const vazirmatnRDNL: FontFace[] = [
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/non-latin/woff2-RD/Vazirmatn-NL-Thin.woff2',
    weight: '100',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/non-latin/woff2-RD/Vazirmatn-NL-ExtraLight.woff2',
    weight: '200',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/non-latin/woff2-RD/Vazirmatn-NL-Light.woff2',
    weight: '300',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/non-latin/woff2-RD/Vazirmatn-NL-Regular.woff2',
    weight: '400',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/non-latin/woff2-RD/Vazirmatn-NL-Medium.woff2',
    weight: '500',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/non-latin/woff2-RD/Vazirmatn-NL-SemiBold.woff2',
    weight: '600',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/non-latin/woff2-RD/Vazirmatn-NL-Bold.woff2',
    weight: '700',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/non-latin/woff2-RD/Vazirmatn-NL-ExtraBold.woff2',
    weight: '800',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/non-latin/woff2-RD/Vazirmatn-NL-Black.woff2',
    weight: '900',
    unicodeRange: persianUnicodeRange
  }
]
const vazirmatnRDPlain: FontFace[] = [
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/plain/Vazirmatn-RD-Thin.woff2',
    weight: '100',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/plain/Vazirmatn-RD-ExtraLight.woff2',
    weight: '200',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/plain/Vazirmatn-RD-Light.woff2',
    weight: '300',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/plain/Vazirmatn-RD-Regular.woff2',
    weight: '400',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/plain/Vazirmatn-RD-Medium.woff2',
    weight: '500',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/plain/Vazirmatn-RD-SemiBold.woff2',
    weight: '600',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/plain/Vazirmatn-RD-Bold.woff2',
    weight: '700',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/plain/Vazirmatn-RD-ExtraBold.woff2',
    weight: '800',
    unicodeRange: persianUnicodeRange
  },
  {
    name: 'vazirmatn',
    path: '/fonts/vazirmatn-round-dots/plain/Vazirmatn-RD-Black.woff2',
    weight: '900',
    unicodeRange: persianUnicodeRange
  }
]
const roboto: FontFace[] = [
  {
    name: 'roboto',
    path: '/fonts/roboto/Roboto-Thin.woff2',
    weight: '100',
    unicodeRange: latinUnicodeRange
  },
  {
    name: 'roboto',
    path: '/fonts/roboto/Roboto-Light.woff2',
    weight: '300',
    unicodeRange: latinUnicodeRange
  },
  {
    name: 'roboto',
    path: '/fonts/roboto/Roboto-Regular.woff2',
    weight: 'normal',
    unicodeRange: latinUnicodeRange
  },
  {
    name: 'roboto',
    path: '/fonts/roboto/Roboto-Medium.woff2',
    weight: '500',
    unicodeRange: latinUnicodeRange
  },
  {
    name: 'roboto',
    path: '/fonts/roboto/Roboto-Bold.woff2',
    weight: 'bold',
    unicodeRange: latinUnicodeRange
  },
  {
    name: 'roboto',
    path: '/fonts/roboto/Roboto-Black.woff2',
    weight: '900',
    unicodeRange: latinUnicodeRange
  }
]

export const typography = {
  fontFamily: ["vazirmatn, roboto"].join(','),
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 800,
  h1: {
    fontWeight: 800,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    letterSpacing: 2,
    ...responsiveFontSizes({sm: 52, md: 58, lg: 64}),
  },
  h2: {
    fontWeight: 800,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({sm: 40, md: 44, lg: 48}),
  },
  h3: {
    fontWeight: 800,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({sm: 26, md: 30, lg: 32}),
  },
  h4: {
    fontWeight: 800,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({sm: 20, md: 24, lg: 24}),
  },
  h5: {
    fontWeight: 800,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({sm: 19, md: 20, lg: 20}),
  },
  h6: {
    fontWeight: 800,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({sm: 18, md: 18, lg: 18}),
  },
  subtitle1: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 500,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize',
  },
} as const;

export const appFonts = generateFonts(
    // ...iransansFD,
    // ...iransansPlain,
    ...vazirmatnFD,
    // ...vazirmatnFDNL,
    // ...vazirmatnNL,
    // ...vazirmatnPlain,
    // ...vazirmatnRDFD,
    // ...vazirmatnRDFDNL,
    // ...vazirmatnRDNL,
    // ...vazirmatnRDPlain,
    ...roboto
)
