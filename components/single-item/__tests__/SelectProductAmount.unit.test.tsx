import { screen, render } from "@testing-library/react";
import SelectProductAmount from "../SelectProductAmount";
import { Mode } from "@/types/enums";
import { userEvent } from "@testing-library/user-event";

describe("SelectProductAmount component", () => {
  it("renders header and current amount in SingleProduct mode", () => {
    render(
      <SelectProductAmount
        mode={Mode.SingleProduct}
        amount={1}
        setAmount={() => {}}
      />
    );
    expect(screen.getByText("Amount:")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Select amount, currently 1")
    ).toBeInTheDocument();
  });

  it("renders 10 select items in SingleProduct mode", async () => {
    const user = userEvent.setup();

    render(
      <SelectProductAmount
        mode={Mode.SingleProduct}
        amount={1}
        setAmount={() => {}}
      />
    );

    const trigger = screen.getByLabelText("Select amount, currently 1");
    await user.click(trigger);

    const items = await screen.findAllByRole("option");
    expect(items).toHaveLength(10);
  });

  it("disables the select in CartItem mode", async () => {
    render(
      <SelectProductAmount
        mode={Mode.CartItem}
        amount={1}
        setAmount={async () => {}}
        isLoading={true}
      />
    );

    const trigger = screen.getByLabelText("Select amount, currently 1");
    expect(trigger).toBeDisabled();
  });

  it("enables the select in CartItem mode", async () => {
    render(
      <SelectProductAmount
        mode={Mode.CartItem}
        amount={1}
        setAmount={async () => {}}
        isLoading={false}
      />
    );

    const trigger = screen.getByLabelText("Select amount, currently 1");
    expect(trigger).not.toBeDisabled();
  });

  it("calls setAmount when an option is selected", async () => {
    const mockSetAmount = vi.fn();
    const user = userEvent.setup();

    render(
      <SelectProductAmount
        mode={Mode.SingleProduct}
        amount={1}
        setAmount={mockSetAmount}
      />
    );

    const trigger = screen.getByLabelText("Select amount, currently 1");
    await user.click(trigger);

    const option = await screen.findByRole("option", { name: "3" });
    await user.click(option);

    expect(mockSetAmount).toHaveBeenCalledWith(3);
  });
});
