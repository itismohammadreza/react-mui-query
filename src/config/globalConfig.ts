import { AppState } from "@models/common";

export const globalConfig: Readonly<AppState> = {
  paletteMode: "light",
  direction: "ltr",
  locale: "faIR",
  langStorageKey: "lng",
  apiUrl: import.meta.env.VITE_API_URL!,
  requestTimeout: 15000,
}

