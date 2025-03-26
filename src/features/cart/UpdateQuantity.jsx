import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { dicreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2 md:gap-2">
      <Button
        type={"round"}
        onClick={() => dispatch(dicreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        type={"round"}
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateQuantity;
