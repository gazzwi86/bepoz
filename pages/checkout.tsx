import * as React from "react";
import { Layout } from "../components/Layout";
import { SelectUser } from "../components/SelectUser";
import { Checkout } from "../components/Checkout";
import { CheckoutContext } from "../utils/checkoutContextProvider";

const CheckoutPage = () => {
  // @ts-ignore
  const { checkout } = React.useContext(CheckoutContext)
  const [_, setUser] = React.useState(checkout.getUser())
  const handleUserSelect: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setUser(event.target.value)
    checkout.setUser(parseInt(event.target.value));
  }

  return (
    <Layout title="Checkout | Super Simple Store">
      <h1>Checkout</h1>
      <p>Welcome to the checkout</p>
      <SelectUser handleUserSelect={handleUserSelect} />
      <hr/>
      <Checkout items={checkout.getBasket()} />
    </Layout>
  );
};

export default CheckoutPage;
