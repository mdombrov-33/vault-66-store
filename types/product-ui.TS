import { Mode } from "./enums";

type SelectProductAmountProps = {
  mode: Mode.SingleProduct;
  amount: number;
  setAmount: (value: number) => void;
};
