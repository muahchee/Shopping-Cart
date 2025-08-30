import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShopItem from "../src/items/ShopItem";

const shopItemData = {
  title: "Froggy Chair",
  price: 33.0,
};

const handleSubmit = vi.fn((e) => e.preventDefault());

describe("Shop item", () => {
  it("renders elements if shopItemData prop is provided", () => {
    render(
      <ShopItem handleSubmit={handleSubmit} shopItemData={shopItemData} />
    );

    const heading = screen.getByRole("heading");
    const price = screen.getByText((content) => content.startsWith("$"));
    const input = screen.getByLabelText("Amount");
    const button = screen.getByRole("button", { name: "Add to Cart" });

    expect(heading).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("does not render elements if shopItemData prop is missing", () => {
    render(<ShopItem handleSubmit={handleSubmit} />);

    const heading = screen.queryByRole("heading");
    const price = screen.queryByText((content) => content.startsWith("$"));
    const input = screen.queryByLabelText("Amount");
    const button = screen.queryByRole("button", { name: "Add to Cart" });

    expect(heading).not.toBeInTheDocument();
    expect(price).not.toBeInTheDocument();
    expect(input).not.toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  });

  it("renders correct title and price", () => {
    render(
      <ShopItem handleSubmit={handleSubmit} shopItemData={shopItemData} />
    );

    const title = screen.getByRole("heading");
    const price = screen.getByText((content) => content.startsWith("$"));

    expect(title.textContent).toMatch(/Froggy Chair/i);
    expect(price.textContent).toMatch(/33/);
  });

  it("defaults input value to 1 when value is not a number", async () => {
    const user = userEvent.setup();
    render(
      <ShopItem handleSubmit={handleSubmit} shopItemData={shopItemData} />
    );
    const input = screen.getByLabelText("Amount");

    await user.type(input, "asdfasdf");

    expect(input).toHaveValue(1);
  });

  it("defaults input value to 1 when value is less than 1", () => {
    render(
      <ShopItem handleSubmit={handleSubmit} shopItemData={shopItemData} />
    );
    const input = screen.getByLabelText("Amount");

    fireEvent.change(input, { target: { value: 0 } });

    expect(input).toHaveValue(1);
  });

  it("disables Add to Cart Button if handleSubmit is not provided", () => {
    render(<ShopItem shopItemData={shopItemData} />);
    expect(screen.getByRole("button", { name: "Add to Cart" })).toBeDisabled();
  });

  it("calls handleSubmit when Add to Cart button is pressed", async () => {
    const user = userEvent.setup();
    render(
      <ShopItem handleSubmit={handleSubmit} shopItemData={shopItemData} />
    );

    const button = screen.getByRole("button", { name: "Add to Cart" });

    await user.click(button);

    expect(handleSubmit).toHaveBeenCalled();
  });
});
