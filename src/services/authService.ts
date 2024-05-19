import { getState } from "@redux/store/rootStore";
import { httpService } from "@services/api/httpService";
import { redirect } from "react-router-dom";

const endpoint = "auth";

const hasPermission = (input: string[] | string) => {
  if (!input || !input.length) {
    return true
  }
  const userPermissions = getState().user.permissions;
  if (Array.isArray(input)) {
    return userPermissions.some(p => input.includes(p))
  }
  return userPermissions.includes(input)
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
