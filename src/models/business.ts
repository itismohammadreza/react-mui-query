export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  permissions: any[];
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: number;
  images: string[];
}

export type UserState = User;
