/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    token: string;
    username?: string; // ✅ جعل بعض الحقول اختيارية
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
    phone?: string;
    isVerifed?: boolean;
    blocked?: boolean;
    name?: string | null; // ✅ دعم `name`
  }

  interface Session {
    user: {
      id: string;
      username?: string;
      email: string;
      firstName?: string;
      lastName?: string;
      role: string;
      phone?: string;
      isVerifed?: boolean;
      blocked?: boolean;
      name?: string | null;
    };
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token: string;
    accessToken: string;
    id: string;
    username?: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
    phone?: string;
    isVerifed?: boolean;
    blocked?: boolean;
    name?: string | null;
  }
}
