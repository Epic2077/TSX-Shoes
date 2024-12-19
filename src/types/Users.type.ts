export type User = {
  id: string;
  username?: string;
  email: string;
  name: string;
  lastName?: string;
  password: string;
  phone?: string;
  promo?: string;
  carts?: string[];
  orders?: string[];
  completed?: string[];
  wishlist?: string[];
};
