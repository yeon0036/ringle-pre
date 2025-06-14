"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { Store } from "@/store";

export default function Providers({ children }: { children: ReactNode }) {
  return <Provider store={Store}>{children}</Provider>;
}
