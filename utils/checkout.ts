import { HydratedBasket, Rule, RuleTypes } from "../interfaces";
import { sampleProductData, sampleUserData } from "./sample-data";

export class Checkout {
  private user: number;
  private rules: Rule[];
  private basketItems: HydratedBasket = [];

  /*
    When instantiating the class, you can pass in an initial state
    Args:
      basketItems (HydratedBasket) an array of basket items
      rules (Rule[]) the rules associated with baskets
      user (int) the id of the current user
    Returns:
      An array of basket items
  */
  constructor(basketItems: HydratedBasket, rules: Rule[], user: number) {
    this.basketItems = basketItems;
    this.user = user;
    this.rules = rules;
  }

  /*
    Recalculate the price of items in the basket based on the quantity
    Args:
      newProduct (int) the id of the product being added
      quantity (int) the quantity of the item to be added
    Returns:
      An array of basket items
  */
  private recalculatePrices() {
    this.basketItems = this.basketItems.map((basketItem) => {
      basketItem.price = parseFloat(
        (basketItem.unitPrice * basketItem.quantity).toFixed(2)
      );

      return basketItem;
    });
  }

  /*
    Get the basket in full
    Returns:
      An array of basket items
  */
  public getBasket() {
    return this.basketItems;
  }

  /*
    Set the active user by id
    Args:
      user (int) the user id
    Returns:
      An array of basket items
  */
  public setUser(user: number) {
    this.user = user;
    return this.getUser();
  }

  /*
    Get the current user
    Returns:
      The current user or undefined
  */
  public getUser() {
    return sampleUserData.find((user) => user.id === this.user);
  }

  /*
    Add an item to the basket
    Args:
      newProduct (int) the id of the product being added
      quantity (int) the quantity of the item to be added
    Returns:
      An array of basket items
  */
  public add(newProduct: number, quantity: number) {
    const product = sampleProductData.find(
      (product) => product.id === newProduct
    );
    const foundInBasket = this.basketItems.find(
      (product) => product.id === newProduct
    );

    if (!product) return; // need some sort of error for unfound products

    if (foundInBasket) {
      this.basketItems = this.basketItems.map((basketItem) => {
        // update quantity
        if (basketItem.id === newProduct) {
          basketItem.quantity += quantity;
        }

        return basketItem;
      });

      this.recalculatePrices();
    } else {
      this.basketItems.push({
        ...product,
        quantity,
        unitPrice: product.price,
        price: product.price * quantity,
      });
    }

    return this.basketItems;
  }

  /* 
    Fetch the total for the items in the basket,
    calculating the discount that should be applied to the final total
    Args:
      newProduct (int) the id of the product being added
      quantity (int) the quantity of the item to be added
    Returns:
      An array of basket items
  */
  public total() {
    let totalPrice = 0.0;
    let discount = 0.0;
    const isRuleForUser = this.rules.find((rule) => rule.user === this.user);

    if (isRuleForUser) {
      // loop the items in the basket and check for items that may have a discount applicable
      this.basketItems.forEach((item) => {
        const {
          item: ruleItem,
          type: ruleType,
          quantity: ruleQtyRequired,
          discount: ruleDiscountAmount,
        } = isRuleForUser; // make the rule variables a little more human readable

        if (item.id === ruleItem) {
          if (item.quantity >= ruleQtyRequired) {
            switch (ruleType) {
              case RuleTypes.COST:
                item.unitPrice -= ruleDiscountAmount;
                break;

              case RuleTypes.CUMULATIVE:
                const multiplesOfDiscount = Math.floor(
                  item.quantity / ruleQtyRequired
                );
                discount += multiplesOfDiscount * item.unitPrice;
                break;
            }
          }
        }
      });

      this.recalculatePrices();
    }

    this.basketItems.forEach((item) => {
      totalPrice += item.price;
    });

    return parseFloat((totalPrice - discount).toFixed(2));
  }
}
