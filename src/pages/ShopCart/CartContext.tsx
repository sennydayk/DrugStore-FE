import React, { createContext, useContext, useState, ReactNode } from "react";

// CartItem 타입 정의 (필요에 따라 수정)
interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

// CartContext 타입 정의
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (items: CartItem[]) => void;
}

// CartContext 생성 및 기본값 설정
const CartContext = createContext<CartContextType | undefined>(undefined);

// useCart 훅
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// CartProvider 컴포넌트 타입 정의
interface CartProviderProps {
  children: ReactNode;
}

// CartProvider 컴포넌트
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (items: CartItem[]) => {
    setCartItems((prevItems) => [...prevItems, ...items]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
