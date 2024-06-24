import { AppState } from "@models/common";

export const globalConfig: Readonly<AppState> = {
  paletteMode: "light",
  rtl: false,
  locale: "faIR",
  langStorageKey: "lng",
  apiUrl: import.meta.env.VITE_API_URL!,
  requestTimeout: 15000,
}

