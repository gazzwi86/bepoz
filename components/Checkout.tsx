import React from "react";
import { sampleProductData } from "../utils/sample-data";
import { Basket, Product } from "../interfaces";
import { CheckoutContext } from "../utils/checkoutContextProvider";

interface CheckoutProps {
  items: Basket[];
}

export const Checkout: React.FC<CheckoutProps> = ({ items }) => {
  // @ts-ignore
  const { checkout } = React.useContext(CheckoutContext)
  
  const listItems = React.useCallback((items: Basket[]) =>
    items
      .map((item) => {
        const product = sampleProductData.find(
          (product: Product) => product.id === item.id
        );

        return {
          ...product,
          quantity: item.quantity,
        };
      })
      .map((item) => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.quantity}</td>
          <td>{item.price}</td>
          <td></td>
        </tr>
      ))
  , [items]);

  return (
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Description</td>
          <td>Quantity</td>
          <td>Unit Price</td>
          <td>Price</td>
        </tr>
      </thead>

      <tbody>
        {items.length > 0 ? listItems(items) : <tr><td>There are no items in your basket</td></tr>}
      </tbody>

      <tfoot>
        <tr>
          <td>Total</td>
          <td></td>
          <td></td>
          <td>{checkout.total()}</td>
        </tr>
      </tfoot>
    </table>
  );
};
