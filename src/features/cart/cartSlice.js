import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    {
      pizzaID: 12,
      quantety: 2,
      unitPrice: 16,
      totalPrice: 32,
      name: "Mediterrenean",
    },
  ],
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
