import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItem from "../src/items/CartItem";



describe("CartItem", () => {
  //renders title, price, input, button
  //does not render if cartItemData prop is not provided
  //calls handleSubmit() when input element is changed
  //calls handleDelete() when delete btn is pressed
});
