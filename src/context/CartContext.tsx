import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: number;
  selectedColor: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: string; size: number; color: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; size: number; color: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "SET_CART_OPEN"; payload: boolean }
  | { type: "LOAD_CART"; payload: CartItem[] };

const CART_STORAGE_KEY = "lovely-collections-cart";
const FREE_SHIPPING_THRESHOLD = 100000;

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.product.id === action.payload.product.id &&
          item.selectedSize === action.payload.selectedSize &&
          item.selectedColor === action.payload.selectedColor
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, items: updatedItems };
      }

      return { ...state, items: [...state.items, action.payload] };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(
              item.product.id === action.payload.productId &&
              item.selectedSize === action.payload.size &&
              item.selectedColor === action.payload.color
            )
        ),
      };
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === action.payload.productId &&
                item.selectedSize === action.payload.size &&
                item.selectedColor === action.payload.color
              )
          ),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.productId &&
          item.selectedSize === action.payload.size &&
          item.selectedColor === action.payload.color
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };

    case "SET_CART_OPEN":
      return { ...state, isOpen: action.payload };

    case "LOAD_CART":
      return { ...state, items: action.payload };

    default:
      return state;
  }
};

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: number, color: string) => void;
  updateQuantity: (productId: string, size: number, color: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
  subtotal: number;
  shippingCost: number;
  total: number;
  itemCount: number;
  freeShippingRemaining: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: "LOAD_CART", payload: parsedCart });
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const subtotal = state.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 5000;
  const total = subtotal + shippingCost;
  const itemCount = state.items.reduce((count, item) => count + item.quantity, 0);
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const value: CartContextType = {
    items: state.items,
    isOpen: state.isOpen,
    addItem: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
    removeItem: (productId, size, color) =>
      dispatch({ type: "REMOVE_ITEM", payload: { productId, size, color } }),
    updateQuantity: (productId, size, color, quantity) =>
      dispatch({ type: "UPDATE_QUANTITY", payload: { productId, size, color, quantity } }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    toggleCart: () => dispatch({ type: "TOGGLE_CART" }),
    setCartOpen: (isOpen) => dispatch({ type: "SET_CART_OPEN", payload: isOpen }),
    subtotal,
    shippingCost,
    total,
    itemCount,
    freeShippingRemaining,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
