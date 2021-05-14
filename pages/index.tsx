import * as React from "react";
import { Layout } from "../components/Layout";
import { Products } from "../components/Products";
import { Basket } from "../interfaces";
import { CheckoutContext } from "../utils/checkoutContextProvider";
import { sampleProductData } from "../utils/sample-data";

const IndexPage = () => {
  // @ts-ignore
  const { checkout } = React.useContext(CheckoutContext)
  const handleAddToBasket: (item: number, quantity: number) => Basket[] = (item, quantity) => checkout.add(item, quantity)
  
  return (
    <Layout title="Home | Super Simple Store">
      <h1>Super simple store</h1>
      <p>Welcome to the super simple store</p>

      <Products items={sampleProductData} handleAddToBasket={handleAddToBasket} />
    </Layout>
  );
}

export default IndexPage;
