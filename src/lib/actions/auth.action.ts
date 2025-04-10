"use server";

import { JSON_HEADER } from "../constants/api.constant";

const BASE_URL = "https://flower.elevateegy.com/api/v1/auth";

export const registerAction = async (fields: RegisterFields) => {4
  console.log(fields);
  
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      body: JSON.stringify(fields),
      headers: JSON_HEADER,
    });

    const data = await response.json();
    console.log("Register API Response success:", data);
      //  عرض رسالة نجاح مع اسم المستخدم
   
    if (!response.ok) {
      console.log("Registration failed:", data);

      throw new Error(data.message || "Registration failed");
    }


    return data;
  } catch (error) {
    console.log("Registration error:", error);

    //  Typecast error to handle it properly
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("An unknown error occurred.");
  }
};

export const forgotPasswordAction = async (fields: ForgotPasswordFields) => {4
  console.log(fields);
  
  try {
    const response = await fetch(`${BASE_URL}/forgotPassword`, {
      method: "POST",
      body: JSON.stringify(fields),
      headers: JSON_HEADER,
    });

    const data = await response.json();
    console.log("Register API Response success:", data);
      //  عرض رسالة نجاح مع اسم المستخدم
   
    if (!response.ok) {
      console.log("Registration failed:", data);

      throw new Error(data.message || "Registration failed");
    }


    return data;
  } catch (error) {
    console.log("Registration error:", error);

    //  Typecast error to handle it properly
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("An unknown error occurred.");
  }
};
export const verifyCodeAction = async (fields: VerifyCodeFields) => {4
  console.log(fields);
  
  try {
    const response = await fetch(`${BASE_URL}/verifyResetCode`, {
      method: "POST",
      body: JSON.stringify(fields),
      headers: JSON_HEADER,
    });

    const data = await response.json();
    console.log(data);
    
    console.log("Register API Response success:", data);
      //  عرض رسالة نجاح مع اسم المستخدم
   
    if (!response.ok) {
      console.log("Registration failed:", data);

      throw new Error(data.message || "Registration failed");
    }


    return data;
  } catch (error) {
    console.log("Registration error:", error);

    //  Typecast error to handle it properly
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("An unknown error occurred.");
  }
};
export const resetPasswordAction = async (fields: { email: string; newPassword: string }) => {
  try {
    const response = await fetch(`${BASE_URL}/resetPassword`, {
      method: "PUT",
      body: JSON.stringify(fields),
      headers: JSON_HEADER,
    });
    console.log(response);
    

    if (!response.ok) {
      throw new Error("Reset password failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Reset Password Error:", error);
    throw error;
  }
};