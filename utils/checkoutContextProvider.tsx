import * as React from "react";
import { Checkout as CheckoutClass } from "./checkout";
import { sampleRulesData } from "./sample-data";

const checkout = new CheckoutClass([], sampleRulesData, 100);

// @ts-ignore
export const CheckoutContext = React.createContext();

interface CheckoutProviderProps {
  children: React.ReactNode;
}

const CheckoutProvider: React.FC<CheckoutProviderProps> = ({ children }) => (
  <CheckoutContext.Provider
    value={{
      checkout: checkout,
    }}
  >
    {children}
  </CheckoutContext.Provider>
);

export default CheckoutProvider;
