import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItem from "../src/items/CartItem";

const cartItemData = {
  id: 1,
  title: "Froggy Chair",
  price: 33.0,
  amount: 5,
};

const handleSubmit = vi.fn();
const handleDelete = vi.fn();

describe("CartItem", () => {
  it("renders elements if cartItemData prop is provided", () => {
    render(
      <CartItem handleSubmit={handleSubmit} handleDelete={handleDelete} cartItemData={cartItemData} />
    );

    const heading = screen.getByRole("heading");
    const price = screen.getByText((content) => content.startsWith("$"));
    const input = screen.getByLabelText("Amount");
    const button = screen.getByRole("button", { name: "Remove" });

    expect(heading).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("does not render elements if shopItemData prop is missing", () => {
    render(<CartItem handleSubmit={handleSubmit}  handleDelete={handleDelete} />);

    const heading = screen.queryByRole("heading");
    const price = screen.queryByText((content) => content.startsWith("$"));
    const input = screen.queryByLabelText("Amount");
    const button = screen.queryByRole("button", { name: "Remove" });

    expect(heading).not.toBeInTheDocument();
    expect(price).not.toBeInTheDocument();
    expect(input).not.toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  });


  it("renders correct title, price and amount", () => {
    render(
      <CartItem handleSubmit={handleSubmit} handleDelete={handleDelete} cartItemData={cartItemData} />
    );
    
    const title = screen.getByRole("heading");
    const price = screen.getByText((content) => content.startsWith("$"));
    const input = screen.getByLabelText("Amount");

    expect(title.textContent).toMatch(/Froggy Chair/i);
    expect(price.textContent).toMatch(/33/);
    expect(input).toHaveValue(5);
  });

  it("defaults input value to provided amount when value is not a number", async () => {
    const user = userEvent.setup();
    render(
      <CartItem handleSubmit={handleSubmit} handleDelete={handleDelete} cartItemData={cartItemData} />
    );
    const input = screen.getByLabelText("Amount");

    await user.type(input, "asdfasdf");

    expect(input).toHaveValue(5);
  });

  it("defaults input value to provided amount when value is less than 1", () => {
    render(
      <CartItem handleSubmit={handleSubmit} handleDelete={handleDelete} cartItemData={cartItemData} />
    );
    const input = screen.getByLabelText("Amount");

    fireEvent.change(input, { target: { value: 0 } });

    expect(input).toHaveValue(5);
  });

  it("calls handleSubmit when input is changed with an appropriate value", async () => {
    const user = userEvent.setup();

    render(
      <CartItem handleSubmit={handleSubmit} handleDelete={handleDelete} cartItemData={cartItemData} />
    );

    const input = screen.getByLabelText("Amount");

    await user.type(input, "0");

    expect(handleSubmit).toHaveBeenCalled();
  });

  it("calls handleDelete when Remove button is pressed", async () => {
    const user = userEvent.setup();
    render(
      <CartItem handleSubmit={handleSubmit} handleDelete={handleDelete} cartItemData={cartItemData} />
    );

    const button = screen.getByRole("button", { name: "Remove" });

    await user.click(button);

    expect(handleDelete).toHaveBeenCalled();
  });




  
  //renders title, price, input, button
  //does not render if cartItemData prop is not provided
  //calls handleSubmit() when input element is changed
  //calls handleDelete() when delete btn is pressed
});
