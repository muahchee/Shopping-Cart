import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "../src/sections/Cart";

describe("Shop", () => {

  //--mock child components--
  //renders CartItem if selectedArr is not empty
  //don't render a <CartItem /> if data type is wrong
  //don't render a <CartItem /> if a field is missing
  //renders "cart is empty" if selectedArr is empty
  //does not render "there are no products" if there are <ShopItem /> components

})
