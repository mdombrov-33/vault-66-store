"use client";
import React from "react";

import { useState } from "react";
import SelectProductAmount from "@/components/single-item/SelectProductAmount";
import { Mode } from "@/types/enums";
import FormContainer from "@/components/form/FormContainer";
import { SubmitButton, ProductSignInButton } from "@/components/form/Buttons";
import { addToCartAction } from "@/utils/actions/cart";
import { useAuth } from "@clerk/nextjs";
import { useSoundPlayer } from "@/hooks/useSoundPlayer";

function AddToCart({ productId }: { productId: string }) {
  const { playClick } = useSoundPlayer();

  const [amount, setAmount] = useState(1);
  const { userId } = useAuth();

  return (
    <div className="mt-4">
      <SelectProductAmount
        mode={Mode.SingleProduct}
        amount={amount}
        setAmount={setAmount}
      />
      {userId ? (
        <FormContainer action={addToCartAction}>
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="amount" value={amount} />
          <SubmitButton
            text="add to supply bin"
            loadingText="adding to the supply bin..."
            className="mt-8 text-3xl"
            onClick={playClick}
          />
        </FormContainer>
      ) : (
        <ProductSignInButton />
      )}
    </div>
  );
}

export default AddToCart;
