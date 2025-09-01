import CartItem from "../items/CartItem";

function Cart({ handleSubmit, handleDelete, allArr, selectedArr }) {
  return selectedArr.length > 0 ? (
    <div>
      {selectedArr.map((item) => {
        const currentItem = allArr.find(
          (allArrItem) => allArrItem.id === item.id
        );
        const cartItemData = {
          id: currentItem.id,
          title: currentItem.title,
          price: currentItem.price,
          amount: item.amount,
        };
        return (
          <CartItem
            key={cartItemData.id}
            handleDelete={handleDelete}
            handleSubmit={handleSubmit}
            cartItemData={cartItemData}
          />
        );
      })}
    </div>
  ) : (
    <div>
      <p>Cart is Empty</p>
    </div>
  );
}

export default Cart;
