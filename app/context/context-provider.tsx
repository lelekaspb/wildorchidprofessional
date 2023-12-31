"use client";

import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { CartItem } from "@/app/client-utils/utils";

type subscribeProductStateType = {
  id: string;
  productTitle: string;
};

type contextType = {
  subscribeModalOpen: boolean;
  setSubscribeModalOpen: Dispatch<SetStateAction<boolean>>;
  subscribeProduct: subscribeProductStateType;
  setSubscribeProduct: Dispatch<SetStateAction<subscribeProductStateType>>;
  addToCartModalOpen: boolean;
  setAddToCartModalOpen: Dispatch<SetStateAction<boolean>>;
  shoppingCart: CartItem[];
  setShoppingCart: Dispatch<SetStateAction<CartItem[]>>;
};

let cartFromLocalStorage: CartItem[] = [];
let storageString: string | null = null;

const Context = createContext<contextType>({
  subscribeModalOpen: false,
  setSubscribeModalOpen: () => {},
  subscribeProduct: {
    id: "",
    productTitle: "",
  },
  setSubscribeProduct: () => {},
  addToCartModalOpen: false,
  setAddToCartModalOpen: () => {},
  shoppingCart: cartFromLocalStorage,
  setShoppingCart: () => {},
});

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);
  const [subscribeProduct, setSubscribeProduct] = useState({
    id: "",
    productTitle: "",
  });
  const [addToCartModalOpen, setAddToCartModalOpen] = useState(false);

  useEffect(() => {
    if (localStorage) {
      storageString = localStorage.getItem("wopcart");
      if (storageString) {
        cartFromLocalStorage = JSON.parse(storageString);
      } else {
        cartFromLocalStorage = [];
      }
    }
  }, []);

  const [shoppingCart, setShoppingCart] =
    useState<CartItem[]>(cartFromLocalStorage);

  useEffect(() => {
    localStorage.setItem("wopcart", JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  return (
    <Context.Provider
      value={{
        subscribeModalOpen,
        setSubscribeModalOpen,
        subscribeProduct,
        setSubscribeProduct,
        addToCartModalOpen,
        setAddToCartModalOpen,
        shoppingCart,
        setShoppingCart,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useProductsContext() {
  return useContext(Context);
}
