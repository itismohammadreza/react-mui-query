import { httpService } from "@services/api/httpService";
import { Product, User } from "@models/business";
import { globalStateService } from "@services/globalStateService";
import { redirect } from "react-router-dom";

const getProducts = () => {
  return httpService.get<Product[]>('/products');
}

const getProduct = (id: string) => {
  return httpService.get<Product>(`/products/${id}`);
}

const addProduct = (product: Product) => {
  return httpService.post<Product>('/products', product);
}

const editProduct = (product: Partial<Product>) => {
  return httpService.put<Product>(`/products/${product.id}`, product);
}

const login = (data: Partial<User>) => {
  return httpService.post<{ access_token: string }>('auth/login', data);
}

const register = (data: User) => {
  return httpService.post('auth/register', data);
}

const getProfile = () => {
  return httpService.get<User>('auth/profile');
}

const hasPermission = (input: string[] | string) => {
  if (!input || !input.length) {
    return true
  }
  const {user} = globalStateService.get();
  if (Array.isArray(input)) {
    return user?.permissions?.some(p => input.includes(p))
  }
  return user?.permissions?.includes(input)
}

const logout = (returnPath?: string) => {
  let destination = "/auth/login";
  localStorage.removeItem('token');
  globalStateService.set(prev => ({...prev, user: undefined}));
  if (returnPath) {
    const params = new URLSearchParams();
    params.set("return", returnPath);
    destination = `${destination}?${params.toString()}`;
  }
  return redirect(destination);
}

const hasToken = () => {
  return !!localStorage.getItem('token');
}

export const dataService = {
  getProducts,
  getProduct,
  addProduct,
  editProduct,
  hasPermission,
  login,
  register,
  getProfile,
  logout,
  hasToken
}
