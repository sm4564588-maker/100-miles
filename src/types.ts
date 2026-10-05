export type CategoryId = 'all' | 'coffee' | 'croissants' | 'desserts' | 'cakes' | 'coolers';

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  description: string;
  image: string;
  isVeg: boolean;
  bestseller?: boolean;
  prepTime?: string;
  tags?: string[];
  options?: {
    milk?: boolean;
    temperature?: boolean;
    sweetness?: boolean;
    cakeSize?: boolean;
    heating?: boolean;
  };
}

export interface CartItemOption {
  milk?: 'Whole Milk' | 'Oat Milk (+₹40)' | 'Almond Milk (+₹50)';
  temperature?: 'Hot' | 'Iced (+₹20)';
  sweetness?: 'Regular' | 'Less Sweet' | 'No Sugar';
  cakeSize?: '500g' | '1 Kg' | '1.5 Kg' | '2 Kg';
  heating?: 'Warmed' | 'Extra Crispy' | 'Standard';
  customPiping?: string;
  specialInstructions?: string;
}

export interface CartItem {
  id: string; // unique cart row id
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: CartItemOption;
  finalPrice: number;
}

export interface OrderDetails {
  orderId: string;
  orderType: 'delivery' | 'pickup' | 'dinein';
  customerName: string;
  phone: string;
  address?: string;
  tableNumber?: string;
  paymentMethod: 'counter' | 'cod' | 'upi';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  timeAgo: string;
  text: string;
  verified?: boolean;
}
