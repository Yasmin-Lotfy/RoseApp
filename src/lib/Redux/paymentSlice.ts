"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface ShippingAddress {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
}

interface VisaCheckoutArgs {
  shippingAddress: ShippingAddress;
  token: string;
}

interface VisaCheckoutResponse {
  session: CheckoutSession;
}

interface PaymentState {
  session: CheckoutSession | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PaymentState = {
  session: null,
  status: "idle",
  error: null,
};
interface CheckoutSession {
    id: string;
    url: string;
  }
export const visaCheckout = createAsyncThunk<
  VisaCheckoutResponse,
  VisaCheckoutArgs,
  { rejectValue: string }
>(
  "payment/visaCheckout",
  async ({ shippingAddress, token }, { rejectWithValue }) => {
    console.log(shippingAddress, 'yiii');
    
    try {
      const res = await fetch(
        "https://flower.elevateegy.com/api/v1/orders/checkout?url=http://localhost:3000",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({ shippingAddress }),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to checkout");
      }

      const data = await res.json();
      console.log(data, 'payment red');
      
      return { session: data.session };
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  }
);

// ................................
export const cashCheckout = createAsyncThunk<
  VisaCheckoutResponse,
  VisaCheckoutArgs,
  { rejectValue: string }
>(
  "payment/cashCheckout",
  async ({ shippingAddress, token }, { rejectWithValue }) => {
    console.log(shippingAddress, 'yiii');
    
    try {
      const res = await fetch(
        "https://flower.elevateegy.com/api/v1/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({ shippingAddress }),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to checkout");
      }

      const data = await res.json();
      console.log(data, 'payment red');
      
      return { session: data.session };
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  }
);





// ............................

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearPayment(state) {
      state.session = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(visaCheckout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(visaCheckout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.session = action.payload.session;
      })
      .addCase(visaCheckout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to checkout";
      })
      .addCase(cashCheckout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(cashCheckout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.session = action.payload.session;
      })
      .addCase(cashCheckout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to checkout";
      });
  },
});

export const { clearPayment } = paymentSlice.actions;
export default paymentSlice.reducer;