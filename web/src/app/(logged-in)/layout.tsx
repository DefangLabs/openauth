"use client";

import { LoggedIn } from "@/app/(logged-in)/components/logged-in/logged-in";

const tokenOptions = {
  refresh: false,
};

export default function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LoggedIn>{children}</LoggedIn>;
}
