export type Product = {
  id: number;
  name: string;
  price: number;
  order: number;
  size: number[];
  color: string[];
  selectedColor?: string;
  selectedSize?: number;
  quantity?: number;
  brand: string;
  images: string[];
  popular: boolean;
  rate: number;
  sold: number;
};
