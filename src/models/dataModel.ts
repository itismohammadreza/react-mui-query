import { ReactNode } from "react";
import { Direction, PaletteMode } from "@mui/material";
import { Locale } from "@models/theme";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export type SafeAny = any;

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestConfig {
  pathTemplate?: string | RegExp,
  method: RequestMethod;
  // null: default message, false: don't show message, string: custom message
  successMessage?: string | null | false | ((request: AxiosRequestConfig<any>, response?: AxiosResponse) => string | null | false);
  failureMessage?: string | null | false | ((request: AxiosRequestConfig<any>, response?: AxiosResponse) => string | null | false);
  loading?: boolean | ((request: AxiosRequestConfig<any>) => boolean);
  isCustomApi?: boolean;
  loadingOnlyOnce?: boolean;
  timeout?: number | 'none' | ((request: AxiosRequestConfig<any>) => number | 'none');
}

export interface AppState {
  paletteMode: PaletteMode;
  direction: Direction;
  locale: Locale;
  langStorageKey: string;
  apiUrl: string;
  requestTimeout: number;
}

export type UserState = User;

export interface User {
}

export interface RootState {
  user: UserState;
  loading: { value: boolean };
  app: AppState;
}

export type WithChildren<T = any> = { children: ReactNode; } & T;
