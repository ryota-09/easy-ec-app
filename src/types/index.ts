// src/types.ts
export type User = {
  id: string;
  userName: string;
  email: string;
}

export type Product = {
  id: string;
  name: string;
  description: string;
  priceM: number;
  priceL: number;
  imagePath: string;
}

export type Topping = {
  id: string;
  name: string;
  priceM: number;
  priceL: number;
}

export type CartItem = {
  id: string;
  name: string;
  size: 'M' | 'L';
  price: number;
  quantity: number;
}

export type OrderItem = {
  productId: string;
  size: 'M' | 'L';
  quantity: number;
  toppings: Topping[];
}

export type OrderFormData = {
  name: string;
  email: string;
  zipcode: string;
  address: string;
  tel: string;
  deliveryTime: string;
  paymentMethod: string;
}