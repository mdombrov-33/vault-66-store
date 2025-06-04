import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SelectCartItemAmountProps } from "@/types/cart";
import { Mode } from "@/types/enums";
import { SelectProductAmountProps } from "@/types/product-ui";

function SelectProductAmount(
  props: SelectProductAmountProps | SelectCartItemAmountProps
) {
  const { mode, amount, setAmount } = props;
  const cartItem = mode === Mode.CartItem;

  return (
    <>
      <h4 className="mb-2 text-3xl">Amount: </h4>
      <Select
        defaultValue={amount.toString()}
        onValueChange={(value) => setAmount(Number(value))}
        disabled={cartItem ? props.isLoading : false}
      >
        <SelectTrigger
          className={`${cartItem ? "w-[100px]" : "w-[150px]"} text-2xl`}
        >
          <SelectValue className="text-lg" placeholder={amount} />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: cartItem ? amount + 10 : 10 }, (_, i) => {
            const selectValue = (i + 1).toString();
            return (
              <SelectItem
                key={selectValue}
                value={selectValue}
                className="text-xl"
              >
                {selectValue}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
}

export default SelectProductAmount;
