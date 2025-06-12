import { render, screen, waitFor } from "@testing-library/react";
import AddToCart from "@/components/single-item/AddToCart";
import { useAuth } from "@clerk/nextjs";
import { addToCartAction } from "@/utils/actions/cart";
import { userEvent } from "@testing-library/user-event";

vi.mock("@clerk/nextjs", () => ({
  useAuth: vi.fn(),
}));

vi.mock("@/utils/actions/cart", () => ({
  addToCartAction: vi
    .fn()
    .mockResolvedValue({ message: "Product added to cart!" }),
}));

vi.mock("@/hooks/useSoundPlayer", () => ({
  useSoundPlayer: () => ({
    playClick: vi.fn(),
  }),
}));

describe("AddToCart integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls addToCartAction with correct FormData values", async () => {
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      userId: "user123",
    });

    const user = userEvent.setup();

    render(<AddToCart productId="123" />);

    const addToCartBtn = screen.getByRole("button", {
      name: /add to supply bin/i,
    });

    await user.click(addToCartBtn);

    await waitFor(() => {
      expect(addToCartAction).toHaveBeenCalledTimes(1);
    });

    const formDataArg = (addToCartAction as vi.Mock).mock.calls[0][1];

    expect(formDataArg.get("productId")).toBe("123");
    expect(formDataArg.get("amount")).toBe("1");
  });
});
