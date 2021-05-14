import { RuleTypes, Rule, User, Product, Basket } from '../interfaces'

export const sampleRulesData: Rule[] = [
  {
    type: RuleTypes.CUMULATIVE,
    user: 101, // user for discount
    item: 101, // product for discount
    quantity: 3, // discount boundary
    discount: 1, // number of discounted items
  },
  {
    type: RuleTypes.COST,
    user: 102, // user for discount
    item: 103, // product for discount
    quantity: 1, // discount boundary
    discount: 2, // cost reduced
  },
  {
    type: RuleTypes.CUMULATIVE,
    user: 103, // user for discount
    item: 102, // product for discount
    quantity: 5, // discount boundary
    discount: 1, // number of discounted items
  },
]

export const sampleUserData: User[] = [
  { id: 101, name: 'Microsoft' },
  { id: 102, name: 'Amazon' },
  { id: 103, name: 'Facebook' },
]

export const sampleProductData: Product[] = [
  { id: 101, name: 'Small Pizza', description: '10" Pizza for one person', price: 11.99 },
  { id: 102, name: 'Medium Pizza', description: '12" Pizza for one person', price: 15.99 },
  { id: 103, name: 'Large Pizza', description: '15" Pizza for one person', price: 21.99 },
]

export const sampleBasketData: Basket[] = [
  { id: 101, quantity: 1 },
  { id: 102, quantity: 1 },
  { id: 103, quantity: 1 },
]
