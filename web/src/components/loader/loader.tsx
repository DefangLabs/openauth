"use client";

import { CircularProgress } from "@mui/material";
import { Suspense } from "react";

export function Loader({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<CircularProgress />}>{children}</Suspense>;
}
