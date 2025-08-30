function ShopItem({ handleSubmit, shopItemData }) {
  if (!shopItemData) {
    return;
  }
  return (
    <>
      <form>
        <h3>{shopItemData.title || "Title"}</h3>
        <p className="price">${shopItemData.price || "0"}</p>
        <label htmlFor="amount" name="amount">
          Amount
        </label>
        <input type="number" id="amount" min={1} />
        {handleSubmit ? (
          <button type="submit" onSubmit={handleSubmit}>
            Add to Cart
          </button>
        ) : (
          <button type="submit" disabled>
            Add to Cart
          </button>
        )}
      </form>
    </>
  );
}

export default ShopItem;
