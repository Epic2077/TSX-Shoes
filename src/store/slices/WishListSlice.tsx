import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishListState {
  items: string[];
}

const initialState: WishListState = {
  items: [],
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    setWishlist(state, action: PayloadAction<string[]>) {
      state.items = action.payload;
    },
    addToWishlist(state, action: PayloadAction<string>) {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter((id) => id !== action.payload);
    },
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist } =
  wishListSlice.actions;

export default wishListSlice.reducer;
