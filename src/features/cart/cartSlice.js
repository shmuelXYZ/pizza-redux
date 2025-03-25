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
    increaseItemQuantety(state, action) {
      const item = state.cart.find((item) => item.pizzaID === action.payload);
      item.quantety++;
      item.totalPrice = item.quantety * item.unitPrice;
    },
    dicreaseItemQuantety(state, action) {
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
  increaseItemQuantety,
  dicreaseItemQuantety,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getTotalQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantety, 0);

export const getTotalPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCart = (state) => state.cart.cart;
