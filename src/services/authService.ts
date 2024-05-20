import { httpService } from "@services/api/httpService";
import { redirect } from "react-router-dom";
import { globalStateService } from "@services/globalStateService";

const endpoint = "auth";

const hasPermission = (input: string[] | string) => {
  if (!input || !input.length) {
    return true
  }
  const {user} = globalStateService.get();
  if (Array.isArray(input)) {
    return user.permissions.some(p => input.includes(p))
  }
  return user.permissions.includes(input)
}

const login = (data: any) => {
  return httpService.post<any>(`${endpoint}/login`, data);
}

const register = (data: any) => {
  return httpService.post(`${endpoint}/register`, data);
}

const logout = () => {
  localStorage.removeItem('token');
  redirect('/auth/login')
}

export const authService = {
  hasPermission,
  login,
  register,
  logout,
}
