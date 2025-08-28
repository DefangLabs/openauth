"use server";

import { cookies } from "next/headers";

export async function getMarketplaceToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("dfng_temp_marketplace_token")?.value;

  // Clean up the cookie after reading it
  if (token) {
    cookieStore.delete("dfng_temp_marketplace_token");
  }

  return token || null;
}
