import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateQuantity from "../cart/UpdateQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;
  const dispatch = useDispatch();

  function addToCart() {
    const newItem = {
      pizzaId: id,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice * 1,
      name: name,
    };
    dispatch(addItem(newItem));
    console.log(isInCart);
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`${soldOut ? "opacity-90 grayscale" : ""} h-24`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-600">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {isInCart && (
            <div className="flex items-center gap-2 md:gap-8">
              <UpdateQuantity pizzaId={id} currentQuantity={currentQuantity} />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={addToCart}>
              add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
