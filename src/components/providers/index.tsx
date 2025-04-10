
"use client"
import { store } from "@/lib/Redux/store";
import NextAuthProvider from "./components/next-auth-provider";
import ReactQueryProvider from "./components/react-query-provider";
import { Provider as ReduxProvider } from "react-redux";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  // Translation


  return (
    <ReduxProvider store={store}>
      <NextAuthProvider>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </NextAuthProvider>
      </ReduxProvider>
   
  );
}
