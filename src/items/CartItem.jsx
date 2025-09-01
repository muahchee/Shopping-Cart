import { useState } from "react";

function CartItem({ handleSubmit, handleDelete, cartItemData }) {
  const amount = cartItemData ? cartItemData.amount : null;

  const [inputValue, setInputValue] = useState(amount);

  if (!cartItemData) {
    return;
  }

  function handleInputChange(e) {
    let value = Number(e.target.value);
    if (value < 1 || typeof value !== "number") {
      value = inputValue;
    }
    setInputValue(value);
    handleSubmit(e, {
      id: cartItemData.id,
      amount: value,
    });
  }

  return (
    <div>
      <h3>{cartItemData.title || "Title"}</h3>
      <p className="price">${cartItemData.price || "0"}</p>
      <label htmlFor="amount" name="amount">
        Amount
      </label>
      <input
        type="number"
        id="amount"
        min={1}
        value={inputValue}
        onChange={handleInputChange}
      />
      <button type="button" onClick={handleDelete}>
        Remove
      </button>
    </div>
  );
}

export default CartItem;
