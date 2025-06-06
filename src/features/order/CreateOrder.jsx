import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { fetchAddress } from "../user/userSlice";
import { useDispatch } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const isSubmitting = useNavigation().state === "submitting";
  const formErrors = useActionData();
  const dispatch = useDispatch();
  const {
    userName,
    address,
    position,
    status: addressStatus,
    error: addressError,
  } = useSelector((state) => state.user);
  const isLodingAddress = addressStatus === "loading";
  const totalCartPrice = useSelector(getTotalPrice);
  const priority = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priority;
  console.log(cart);

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-7 text-xl font-semibold">
        Ready to order? Let&#39;s go!
      </h2>

      {/*this "FORM" is a react router component */}
      <Form method="POST">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={userName}
            required
            className="input grow"
          />
        </div>

        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-600">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              defaultValue={address}
              disabled={isLodingAddress}
              required
              className="input w-full"
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-600">
                {addressError}
              </p>
            )}
          </div>

          {!position.longitude && !position.latitude && (
            <span className="md:top=[5px] absolute right-[2px] top-[3.5px] z-10 md:right-[5px]">
              <Button
                type="small"
                disabled={isLodingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Fetch Address
              </Button>
            </span>
          )}
        </div>

        <div className="mb-5 flex gap-3">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-300 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {/* hidden input contain the cart and submit with the form */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "sending..."
              : `order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={
            position.longitude && position.latitude
              ? `${position.latitude},${position.longitude}`
              : ""
          }
        />
      </Form>
    </div>
  );
}

// LEARN THIS

// the action function:
// 1.Processes the form data
// 2.Validates the phone number
// 3.Creates a new order via an API call
// 4.Clears the cart in Redux
// 5.Redirects to the order confirmation page

export async function action({ request }) {
  // 1
  const formData = await request.formData();
  // creat an object from the form data
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  console.log(order);
  const errors = {};
  // 2
  if (!isValidPhone(order.phone)) {
    errors.phone = "we need your phone 😊";
  }
  if (Object.keys(errors).length > 0) return errors;
  // 3
  const newOrder = await createOrder(order);
  // do not overuse
  // 4
  store.dispatch(clearCart());
  // 5
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
