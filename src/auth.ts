import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt"; // ✅ Import JWT type

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🔹 Received credentials:", credentials);

        try {
          const response = await fetch(`${process.env.API}/auth/signin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json", // ✅ Ensures API accepts the request
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          console.log("🔹 API Response Status:", response.status);

          if (!response.ok) {
            const errorText = await response.text();
            console.error("🔴 API Error:", errorText);
            throw new Error("Invalid email or password");
          }

          const user = await response.json();
          console.log("✅ Logged in User:", user);

          return {
            id: user.user._id, // ✅ Ensure this matches API response
            email: user.user.email,
            name: user.user.username,
            role: user.user.role,
            token: user.token, // ✅ Store JWT token
          };
        } catch (error) {
          console.error("🔴 Login Error:", error);
          throw new Error("An error occurred during authentication");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", // Redirect to login page on error
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.accessToken = user.token; // ✅ Store JWT token
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        role: token.role as string,
      };
      session.accessToken = token.accessToken as string; // ✅ Include token in session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
