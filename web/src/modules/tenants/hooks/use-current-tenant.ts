"use client";

/**
 * Jotai atom used to keep track of the tenant currently selected by the user.
 *
 * The atom stores only the tenant's ID so that components can react to
 * tenant changes without needing to pass the id through multiple layers of
 * props. The default value of `null` means no tenant has been selected yet.
 */
import { atom, useAtom } from "jotai";

const currentTenantAtom = atom<string | null>(null);

/**
 * Hook exposing the current tenant id and a setter for updating it.
 * Components can call `setCurrentTenant` with a tenant id to change the
 * active tenant throughout the application.
 */
export function useCurrentTenant() {
  const [currentTenant, setCurrentTenant] = useAtom(currentTenantAtom);
  return { currentTenant, setCurrentTenant };
}
