export enum RuleTypes {
  COST = 0,
  CUMULATIVE = 1,
}

export interface Rule {
  user: number
  item: number
  quantity: number
  type: RuleTypes
  discount: number
}

export interface User {
  id: number
  name: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
}

export interface Basket {
  id: number
  quantity: number
}

export interface HydratedProduct extends Product {
  quantity: number
  unitPrice: number
}

export type HydratedBasket = HydratedProduct[]
