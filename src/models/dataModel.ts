import { ReactElement, ReactNode } from "react";
import { Direction, PaletteMode } from "@mui/material";
import { Locale } from "@models/theme";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { UseFormProps } from "react-hook-form";

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
  name?: string;
  permissions?: any[];
}

export interface RootState {
  user: UserState;
  app: AppState;
}

export type WithChildren<T = any> = { children: ReactNode; } & T;

export interface FormHandlerProps<T> extends UseFormProps {
  children: ReactElement | ((args: SafeAny) => ReactElement);
  onSubmit: (data: T) => SafeAny;
  formId?: string;
}
