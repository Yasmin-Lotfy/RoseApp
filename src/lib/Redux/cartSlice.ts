"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// شكل كل منتج في السلة من الـ API
interface Product {
  _id: string;
  title: string;
  slug: string;
  id: string;

  description: string;
  price: number;
  discount: number;
  priceAfterDiscount: number;
  quantity: number;
  sold: number;
  rateAvg: number;
  rateCount: number;
  category: string;
  occasion: string;
  images: string[];
  imgCover: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// عنصر السلة
interface CartItem {
  product: Product;
  quantity: number;
  price?: number;

  _id: string;
}

// شكل الكارت بالكامل
interface FullCart {
  _id: string;
  user: string;
  cartItems: CartItem[];
  discount: number;
  totalPrice: number;
  totalPriceAfterDiscount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// الحالة
interface CartState {
  cart: FullCart | null;
  cartItemsCount: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  cartItemsCount: 0,
  status: "idle",
  error: null,
};

//  thunk لإضافة منتج للسلة
export const addToCart = createAsyncThunk<
  { cart: FullCart; numOfCartItems: number },
  { product: string; quantity: number; token: string },
  { rejectValue: string }
>(
  "cart/addToCart",
  async ({ product, quantity, token }, { rejectWithValue }) => {
    try {
      const res = await fetch("https://flower.elevateegy.com/api/v1/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ product, quantity }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to add to cart");
      }

      const data = await res.json();
      return {
        cart: data.cart,
        numOfCartItems: data.numOfCartItems,
      };
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  }
);
//  thunk لإضافة منتج للسلة
export const updateCart = createAsyncThunk<
  { cart: FullCart; numOfCartItems: number },
  { productId: string; quantity: number; token: string },
  { rejectValue: string }
>(
  "cart/updateCart",
  async ({ productId, quantity, token }, { rejectWithValue }) => {
    try {
      const res = await fetch(  `https://flower.elevateegy.com/api/v1/cart/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({  quantity }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to add to cart");
      }

      const data = await res.json();
      return {
        cart: data.cart,
        numOfCartItems: data.numOfCartItems,
      };
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  }
);

//  thunk لاسترجاع السلة
export const getCart = createAsyncThunk<
  { cart: FullCart; numOfCartItems: number },
  { token: string },
  { rejectValue: string }
>("cart/getCart", async ({ token }, { rejectWithValue }) => {
  try {
    const res = await fetch("https://flower.elevateegy.com/api/v1/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Failed to fetch cart");
    }

    const data = await res.json();
    return {
      cart: data.cart,
      numOfCartItems: data.numOfCartItems,
    };
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : "Unknown error"
    );
  }
});

//  thunk لاسترجاع السلة
export const removeCart = createAsyncThunk<
  { cart: FullCart; numOfCartItems: number },
  { productId: string; token: string },
  { rejectValue: string }
>("cart/removeCart", async ({ productId ,token }, { rejectWithValue }) => {
  try {
    const res = await fetch(
      `https://flower.elevateegy.com/api/v1/cart/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Failed to fetch cart");
    }

    const data = await res.json();
    return {
      cart: data.cart,
      numOfCartItems: data.numOfCartItems,
    };
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : "Unknown error"
    );
  }
});

//  slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.cart = null;
      state.cartItemsCount = 0;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload.cart;
        state.cartItemsCount = action.payload.numOfCartItems;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add to cart";
      })
      // Add the getCart extraReducer
      .addCase(getCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload.cart;
        state.cartItemsCount = action.payload.numOfCartItems;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch cart";
      })
        // Add the removeCart extraReducer
        .addCase(removeCart.pending, (state) => {
          state.status = "loading";
        })
        .addCase(removeCart.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.cart = action.payload.cart;
          state.cartItemsCount = action.payload.numOfCartItems;
        })
        .addCase(removeCart.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload || "Failed to fetch cart";
        })
           // Add the removeCart extraReducer
           .addCase(updateCart.pending, (state) => {
            state.status = "loading";
          })
          .addCase(updateCart.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.cart = action.payload.cart;
            state.cartItemsCount = action.payload.numOfCartItems;
          })
          .addCase(updateCart.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || "Failed to fetch cart";
          });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
