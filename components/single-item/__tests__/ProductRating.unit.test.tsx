import { render, screen } from "@testing-library/react";
import ProductRating from "../ProductRating";

vi.mock("@/utils/actions/review", () => ({
  fetchProductRating: vi.fn().mockResolvedValue({ rating: 4.5, count: 20 }),
}));

describe("ProductRating component", () => {
  it("renders rating and count", async () => {
    const jsx = await ProductRating({ productId: "123" });

    render(jsx);

    const rating = await screen.findByText((content) =>
      content.includes("4.5")
    );
    const count = await screen.findByText((content) =>
      content.includes("(20 reviews)")
    );

    const star = screen.getByRole("img", { name: "star" });

    expect(rating).toBeInTheDocument();
    expect(count).toBeInTheDocument();
    expect(star).toBeInTheDocument();
  });
});
