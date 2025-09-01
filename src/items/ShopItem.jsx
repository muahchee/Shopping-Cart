import { useState } from "react";

function ShopItem({ handleSubmit, shopItemData }) {
  const [inputValue, setInputValue] = useState(1);
  if (!shopItemData) {
    return;
  }

  function handleInputChange(e) {
    let value = Number(e.target.value);
    if (value < 1 || typeof(value) !== "number") {
      value = 1;
    }
    setInputValue(value);
  }

  function handleClick(e) {
    e.preventDefault;
    handleSubmit(e, {
      id: shopItemData.id,
      amount: inputValue,
    });
  }

  return (
      <div>
        <h3>{shopItemData.title || "Title"}</h3>
        <p className="price">${shopItemData.price || "0"}</p>
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
        {handleSubmit ? (
          <button type="button" onClick={handleClick}>
            Add to Cart
          </button>
        ) : (
          <button type="button" disabled>
            Add to Cart
          </button>
        )}
      </div>
  );
}

export default ShopItem;
