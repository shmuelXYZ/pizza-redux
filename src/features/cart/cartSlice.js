import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  //   cart: [
  // {
  //   pizzaID: 12,
  //   quantety: 2,
  //   unitPrice: 16,
  //   totalPrice: 32,
  //   name: "Mediterrenean",
  // },
  //   ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaID !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaID === action.payload);
      item.quantety++;
      item.totalPrice = item.quantety * item.unitPrice;
    },
    dicreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaID === action.payload);
      item.quantety--;
      item.totalPrice = item.quantety * item.unitPrice;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  dicreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getTotalQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCart = (state) => state.cart.cart;

// used to determine if the item is already in the cart
/* 
   2 functions the first get id and return another function that get state and use
   the id fromthe outer function to find items exist in the cart or not.
*/
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => (item.pizzaID === id ? item.quantity : 0));
