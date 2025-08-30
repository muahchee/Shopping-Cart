import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItem from "../src/items/CartItem";

const cartItemData = {
  title: "Paddington Bear",
  price: 16.89,
};

const handleSubmit = vi.fn((e) => e.preventDefault());
const handleDelete = vi.fn();



describe("CartItem", () => {

  
  //renders title, price, input, button
  //does not render if cartItemData prop is not provided
  //calls handleSubmit() when input element is changed
  //calls handleDelete() when delete btn is pressed
});
