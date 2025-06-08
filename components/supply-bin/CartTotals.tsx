"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createOrderAction } from "@/utils/actions/order";
import FormContainer from "@/components/form/FormContainer";
import { SubmitButton } from "@/components/form/Buttons";
import { Cart } from "@/lib/generated/prisma/client";
import { useSoundPlayer } from "@/hooks/useSoundPlayer";

function CartTotals({ cart }: { cart: Cart }) {
  const { cartTotal, shipping, tax, orderTotal } = cart;
  const { playClick } = useSoundPlayer();

  return (
    <div>
      <Card className="p-8">
        <CartTotalRow label="Barter Base" amount={cartTotal} />
        <CartTotalRow label="Courier Fee" amount={shipping} />
        <CartTotalRow label="Scavenger's Tax" amount={tax} />
        <CardTitle className="mt-8">
          <CartTotalRow label="Total" amount={orderTotal} lastRow={true} />
        </CardTitle>
      </Card>
      <FormContainer action={createOrderAction}>
        <SubmitButton
          text="Send Barter Request"
          className="mt-8 w-full text-3xl"
          loadingText="Initiating Trade Protocol..."
          onClick={() => playClick()}
        />
      </FormContainer>
    </div>
  );
}

function CartTotalRow({
  label,
  amount,
  lastRow,
}: {
  label: string;
  amount: number;
  lastRow?: boolean;
}) {
  return (
    <>
      <p className="flex justify-between text-3xl">
        <span>{label}</span>
        <span className="font-[roboto]">{amount} Caps</span>
      </p>
      {lastRow ? null : <Separator className="my-2" />}
    </>
  );
}

export default CartTotals;
