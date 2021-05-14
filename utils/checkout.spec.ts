import { HydratedBasket } from "../interfaces";
import { Checkout } from "./checkout";
import {
  sampleRulesData,
  sampleUserData,
  sampleProductData,
} from "./sample-data";

describe("checkout", () => {
  it("should get the initial user", () => {
    const inputItems: number = sampleUserData[0].id;
    const expectedItems = sampleUserData[0];

    const checkout = new Checkout([], sampleRulesData, inputItems);

    expect(checkout.getUser()).toEqual(expectedItems);
  });

  it("should get the newly set user", () => {
    const inputItems: number = sampleUserData[0].id;
    const expectedItems = sampleUserData[0];

    const checkout = new Checkout([], sampleRulesData, 100);
    checkout.setUser(inputItems);

    expect(checkout.getUser()).toEqual(expectedItems);
  });

  it("should set the user", () => {
    const inputItems: number = sampleUserData[0].id;
    const expectedItems = sampleUserData[0];

    const checkout = new Checkout([], sampleRulesData, 100);
    const response = checkout.setUser(inputItems);

    expect(response).toEqual(expectedItems);
  });

  it("should add a new product", () => {
    const inputItems: HydratedBasket = [];
    const expectedItems = {
      id: 101,
      name: "Small Pizza",
      description: '10" Pizza for one person',
      unitPrice: 11.99,
      quantity: 1,
      price: 11.99,
    };

    const checkout = new Checkout(inputItems, sampleRulesData, 101);
    const basket = checkout.add(sampleProductData[0].id, 1);

    expect(basket).toEqual([expectedItems]);
  });

  it("should add a product with two items", () => {
    const inputItems: HydratedBasket = [];
    const expectedItems = {
      id: 101,
      name: "Small Pizza",
      description: '10" Pizza for one person',
      unitPrice: 11.99,
      quantity: 2,
      price: 23.98,
    };

    const checkout = new Checkout(inputItems, sampleRulesData, 101);
    const basket = checkout.add(sampleProductData[0].id, 2);

    expect(basket).toEqual([expectedItems]);
  });

  it("should add increase quantity of existing product", () => {
    const inputItems: HydratedBasket = [
      {
        id: 101,
        name: "Small Pizza",
        description: '10" Pizza for one person',
        unitPrice: 11.99,
        quantity: 1,
        price: 11.99,
      },
    ];

    const expectedItems = {
      id: 101,
      name: "Small Pizza",
      description: '10" Pizza for one person',
      unitPrice: 11.99,
      quantity: 2,
      price: 23.98,
    };

    const checkout = new Checkout(inputItems, sampleRulesData, 101);
    const basket = checkout.add(expectedItems.id, 1);

    expect(basket).toEqual([expectedItems]);
  });

  it("should return a total without rules", () => {
    const inputItems: HydratedBasket = [
      {
        id: 101,
        name: "Small Pizza",
        description: '10" Pizza for one person',
        unitPrice: 11.99,
        quantity: 2,
        price: 23.98,
      },
      {
        id: 102,
        name: "Medium Pizza",
        description: '12" Pizza for one person',
        unitPrice: 15.99,
        quantity: 1,
        price: 15.99,
      },
    ];

    const checkout = new Checkout(inputItems, sampleRulesData, 100);
    expect(checkout.total()).toEqual(39.97);
  });

  it("should return a total with single cost discount", () => {
    const inputItems: HydratedBasket = [
      {
        id: 103,
        name: "Large Pizza",
        description: '15" Pizza for one person',
        unitPrice: 21.99,
        quantity: 1,
        price: 21.99,
      },
    ];

    const checkout = new Checkout(inputItems, sampleRulesData, 102);
    expect(checkout.total()).toEqual(19.99);
  });

  it("should return a total with double  cost discount", () => {
    const inputItems: HydratedBasket = [
      {
        id: 103,
        name: "Large Pizza",
        description: '15" Pizza for one person',
        unitPrice: 21.99,
        quantity: 2,
        price: 43.98,
      },
    ];

    const checkout = new Checkout(inputItems, sampleRulesData, 102);
    expect(checkout.total()).toEqual(39.98);
  });

  it("should return a total with double cost discount, ignoring none discountable products", () => {
    const inputItems: HydratedBasket = [
      {
        id: 101,
        name: "Small Pizza",
        description: '10" Pizza for one person',
        unitPrice: 11.99,
        quantity: 1,
        price: 11.99,
      },
      {
        id: 103,
        name: "Large Pizza",
        description: '15" Pizza for one person',
        unitPrice: 21.99,
        quantity: 2,
        price: 43.98,
      },
    ];

    const checkout = new Checkout(inputItems, sampleRulesData, 102);
    expect(checkout.total()).toEqual(51.97);
  });

  it("should return a total with single cumulative discount", () => {
    const inputItems: HydratedBasket = [
      {
        id: 101,
        name: "Small Pizza",
        description: '10" Pizza for one person',
        unitPrice: 11.99,
        quantity: 3,
        price: 35.97,
      },
    ];

    const checkout = new Checkout(inputItems, sampleRulesData, 101);
    expect(checkout.total()).toEqual(23.98);
  });

  it("should return a total with double cumulative discount", () => {
    const inputItems: HydratedBasket = [
      {
        id: 101,
        name: "Small Pizza",
        description: '10" Pizza for one person',
        unitPrice: 11.99,
        quantity: 6,
        price: 71.98,
      },
    ];

    const checkout = new Checkout(inputItems, sampleRulesData, 101);
    expect(checkout.total()).toEqual(47.96);
  });

  it("should return a total with double cumulative discount, ignoring none discountable products", () => {
    const inputItems: HydratedBasket = [
      {
        id: 101,
        name: "Small Pizza",
        description: '10" Pizza for one person',
        unitPrice: 11.99,
        quantity: 6,
        price: 71.98,
      },
      {
        id: 103,
        name: "Large Pizza",
        description: '15" Pizza for one person',
        unitPrice: 21.99,
        quantity: 1,
        price: 21.99,
      },
    ];

    const checkout = new Checkout(inputItems, sampleRulesData, 101);
    expect(checkout.total()).toEqual(69.95);
  });

  it("should apply microsoft discount on small pizzas", () => {
    const inputItems: HydratedBasket = [
      {
        id: 101,
        name: "Small Pizza",
        description: '10" Pizza for one person',
        unitPrice: 11.99,
        quantity: 3,
        price: 35.97,
      },
    ];

    const checkout = new Checkout(inputItems, sampleRulesData, 101);
    expect(checkout.total()).toEqual(23.98);
  });

  it("should apply amazon discount on large pizzas", () => {
    const inputItems: HydratedBasket = [
      {
        id: 103,
        name: "Large Pizza",
        description: '15" Pizza for one person',
        unitPrice: 21.99,
        quantity: 3,
        price: 65.97,
      },
    ];

    const checkout = new Checkout(inputItems, sampleRulesData, 102);
    expect(checkout.total()).toEqual(59.97);
  });

  it("should apply facebook discount on medoum pizzas", () => {
    const inputItems: HydratedBasket = [
      {
        id: 102,
        name: "Medium Pizza",
        description: '12" Pizza for one person',
        unitPrice: 15.99,
        quantity: 5,
        price: 79.95,
      },
    ];

    const checkout = new Checkout(inputItems, sampleRulesData, 103);
    expect(checkout.total()).toEqual(63.96);
  });
});
