import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "../src/sections/Cart";
// import CartItem from "../src/items/CartItem";

const allArr = [
  {
    id: 1,
    title: "Froggy Chair",
    price: 33,
  },
  {
    id: 2,
    title: "Paddingting",
    price: 310,
  },
  {
    id: 3,
    title: "Candy",
    price: 3.99,
  },
];

const selectedArr = [
  {
    id: 3,
    amount: 1,
  },
  {
    id: 2,
    amount: 5,
  },
];

const handleSubmit = vi.fn();
const handleDelete = vi.fn();

describe("Card", () => {
  it("renders CartItem if selectedArr is not empty", () => {
    render(
      <Cart
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        allArr={allArr}
        selectedArr={selectedArr}
      />
    );
    expect(screen.getByText("Candy")).toBeInTheDocument();
    expect(screen.getByText("Paddingting")).toBeInTheDocument();
  });

  it("renders 'Cart is Empty' if selectedArr is empty", () => {
    render(
      <Cart
        handleSubmit={handleDelete}
        handleDelete={handleDelete}
        allArr={allArr}
        selectedArr={[]}
      />
    );
    expect(screen.queryByTestId("cartItem")).not.toBeInTheDocument();
    expect(screen.queryByText("Cart is Empty")).toBeInTheDocument();
  });

  it("does not 'Cart is Empty' if selectedArr is populated", () => {
    render(
      <Cart
        handleSubmit={handleDelete}
        handleDelete={handleDelete}
        allArr={allArr}
        selectedArr={selectedArr}
      />
    );

    expect(screen.queryByText("Cart is Empty")).not.toBeInTheDocument();
  });
});

//--mock child components--
//renders CartItem if selectedArr is not empty
//don't render a <CartItem /> if data type is wrong
//don't render a <CartItem /> if a field is missing
//renders "cart is empty" if selectedArr is empty
//does not render "there are no products" if there are <ShopItem /> components
