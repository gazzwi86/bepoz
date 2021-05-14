import * as React from "react";
import { Product as iProduct } from "../interfaces";
import { Product } from "./Product";

interface ProductProps {
  items: iProduct[];
  handleAddToBasket: (item: number, quantity: number) => void
}

export const Products: React.FC<ProductProps> = ({ handleAddToBasket, items }) => (
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Description</td>
          <td>Quantity</td>
          <td>Unit Price</td>
          <td>Price</td>
          <td></td>
        </tr>
      </thead>
      
      <tbody>
        {items.map(item => <Product key={item.id} item={item} handleAddToBasket={handleAddToBasket} />)}
      </tbody>
    </table>
  );
