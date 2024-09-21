// src/types.ts

export interface Product {
  id: number;
  name: string;
  description: string;
  priceM: number;
  priceL: number;
  imagePath: string;
}

export interface Topping {
  id: number;
  name: string;
  priceM: number;
  priceL: number;
}

export interface CartItem {
  id: number;
  name: string;
  size: 'M' | 'L';
  price: number;
  quantity: number;
}

export interface OrderFormData {
  name: string;
  email: string;
  zipcode: string;
  address: string;
  tel: string;
  deliveryTime: string;
  paymentMethod: string;
}