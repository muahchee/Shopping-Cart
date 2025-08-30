import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShopItem from "../src/items/ShopItem";

const shopItemData = {
  title: "Froggy Chair",
  price: 33.0,
};

const handleSubmit = vi.fn();

describe("Shop item", () => {
  it("renders element if shopItemData prop is provided", () => {
    const container = render(
      <ShopItem handleSubmit={handleSubmit} shopItemData={shopItemData} />
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("does not render if shopItemData prop is missing", () => {
    render(<ShopItem handleSubmit={handleSubmit} />);

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(
      screen.queryByText((content) => content.startsWith("$"))
    ).not.toBeInTheDocument();
    expect(screen.queryByLabelText("amount")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Add to Cart" })
    ).not.toBeInTheDocument();
  });

  it("renders title and price", () => {
    render(
      <ShopItem handleSubmit={handleSubmit} shopItemData={shopItemData} />
    );

    const title = screen.getByRole("heading");
    const price = screen.getByText((content) => content.startsWith("$"));

    expect(title.textContent).toMatch(/Froggy Chair/i);
    expect(price.textContent).toMatch(/33/);
  });

  it("renders input for amount", () => {
    render(
      <ShopItem handleSubmit={handleSubmit} shopItemData={shopItemData} />
    );
    expect(screen.getByLabelText("Amount")).toBeInTheDocument();
  });

  it("renders Add to Cart Button", () => {
    render(
      <ShopItem handleSubmit={handleSubmit} shopItemData={shopItemData} />
    );
    expect(
      screen.getByRole("button", { name: "Add to Cart" })
    ).toBeInTheDocument();
  });

  it("disables Add to Cart Button if handleSubmit is not provided", () => {
    render(
      <ShopItem shopItemData={shopItemData} />
    );
    expect(
      screen.getByRole("button", { name: "Add to Cart" })
    ).toBeDisabled();
  })

});
