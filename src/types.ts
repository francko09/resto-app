export interface MenuItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface Order {
  _id: string;
  items: MenuItem[];
  status: string;
  username: string;
  createdAt: string;
  servedAt?: string;
}

export interface User {
  username: string;
  role: string;
}