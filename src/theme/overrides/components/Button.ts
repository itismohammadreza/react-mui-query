import { Theme } from "@mui/material";

export const Button = (theme: Theme) => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {},
      }
    }
  };
}
