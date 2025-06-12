import { render, screen } from "@testing-library/react";
import ReviewCard from "../ReviewCard";

vi.mock("./Comment", () => ({
  default: ({ comment }: { comment: string }) => <p>{comment}</p>,
}));

const mockReview = {
  name: "jane doe",
  image: "/avatar.jpg",
  rating: 4,
  comment: "Great product!",
};

describe("ReviewCard", () => {
  it("renders reviewer's name with capitalization", () => {
    render(<ReviewCard reviewInfo={mockReview} />);
    expect(
      screen.getByRole("heading", { name: /jane doe/i })
    ).toBeInTheDocument();
  });

  it("renders the image with correct alt text", () => {
    render(<ReviewCard reviewInfo={mockReview} />);
    const img = screen.getByRole("img", { name: /jane doe/i });
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain("%2Favatar.jpg");
  });

  it("renders the correct number of stars", () => {
    render(<ReviewCard reviewInfo={mockReview} />);
    expect(screen.getAllByLabelText("filled-star")).toHaveLength(4);
    expect(screen.getAllByLabelText("empty-star")).toHaveLength(1);
  });

  it("renders the comment", () => {
    render(<ReviewCard reviewInfo={mockReview} />);
    expect(screen.getByText("Great product!")).toBeInTheDocument();
  });

  it("renders optional children in the top-right corner", () => {
    render(
      <ReviewCard reviewInfo={mockReview}>
        <button>Delete</button>
      </ReviewCard>
    );
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });
});
