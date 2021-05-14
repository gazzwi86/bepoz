import * as React from "react";
import { Product as iProduct } from "../interfaces";

interface ProductProps {
  item: iProduct;
  handleAddToBasket: (item: number, quantity: number) => void
}

export const Product: React.FC<ProductProps> = ({ handleAddToBasket, item }) => {
  const [quantity, setQuantity] = React.useState(1)

  const selectQuantity: React.ChangeEventHandler<HTMLInputElement> = (event) =>
    setQuantity(parseInt(event.target.value));

  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td>
        <input type="number" min="1" max="50" onChange={selectQuantity} />
      </td>
      <td>{item.price}</td>
      <td>{(item.price * quantity).toFixed(2)}</td>
      <td><button onClick={() => handleAddToBasket(item.id, quantity)}>Add to basket</button></td>
    </tr>
  );
};
