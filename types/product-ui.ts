import { Mode } from './enums'

export type SelectProductAmountProps = {
  mode: Mode.SingleProduct
  amount: number
  setAmount: (value: number) => void
}
