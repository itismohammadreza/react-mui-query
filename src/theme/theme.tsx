import { createTheme, CssBaseline } from "@mui/material";
import { useEffect, useMemo } from "react";
import { componentsOverrides } from "@theme/overrides/componentsOverrides";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { palette } from './overrides/palette';
import { appFonts, typography } from './overrides/typography';
import { WithChildren } from "@models/dataModel";
import { useApp } from "@hooks/useApp";
import * as muiLocales from "@mui/material/locale";
import { scrollbar } from "@theme/overrides/scrollbar";

export const locales = muiLocales;

export const ThemeProvider = ({children}: WithChildren) => {
  const {paletteMode, direction, locale} = useApp();

  const theme = useMemo(() =>
          createTheme({
            palette: palette[paletteMode],
            direction,
            typography
          }, locales[locale]),
      [locale, paletteMode, direction]);

  theme.components = {
    MuiCssBaseline: {
      styleOverrides: `
        ${scrollbar({thickness: '10px', radius: '10px', trackColor: '#f5f5f5', thumbColor: '#949494'})};
        ${appFonts}
      `
    },
    ...componentsOverrides(theme)
  };

  useEffect(() => {
    document.documentElement.setAttribute("dir", direction);
    document.documentElement.setAttribute("lang", locale.substring(0, 2));
  }, [direction, locale]);

  return (
      <MUIThemeProvider theme={theme}>
        <CssBaseline/>
        {children}
      </MUIThemeProvider>
  );
}
