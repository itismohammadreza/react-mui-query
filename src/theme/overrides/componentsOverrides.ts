import { Theme } from "@mui/material";
import { TextField } from "./components/TextField";
import { Button } from "./components/Button";

export const componentsOverrides = (theme: Theme) => {
  return Object.assign(
      TextField(theme),
      Button(theme),
  )
}
