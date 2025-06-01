"use client";
import { useState } from "react";
import SelectProductAmount from "@/components/single-product/SelectProductAmount";
import { Mode } from "@/types/enums";
import FormContainer from "@/components/form/FormContainer";
import { SubmitButton } from "@/components/form/Buttons";
import { removeCartItemAction, updateCartItemAction } from "@/utils/actions";
import { toast } from "sonner";

function ThirdColumn({
  quantity,
  cartItemId,
}: {
  quantity: number;
  cartItemId: string;
}) {
  const [amount, setAmount] = useState(quantity);

  const handleAmountChange = async (value: number) => {
    setAmount(value);
  };

  return (
    <div className="md:ml-8">
      <SelectProductAmount
        amount={amount}
        setAmount={handleAmountChange}
        mode={Mode.CartItem}
        isLoading={false}
      />
      <FormContainer action={removeCartItemAction}>
        <input type="hidden" name="cartItemId" value={cartItemId} />
        <SubmitButton size="sm" className="mt-4" text="remove" />
      </FormContainer>
    </div>
  );
}

export default ThirdColumn;
