"use client";

/**
 * Jotai atom used to keep track of the tenant currently selected by the user.
 *
 * The atom stores only the tenant's ID so that components can react to
 * tenant changes without needing to pass the id through multiple layers of
 * props. The default value of `null` means no tenant has been selected yet.
 */
import { useAtom } from "jotai";
// use atom with local storage so that the tenant id is persisted between page reloads
import { atomWithStorage } from "jotai/utils";

const currentTenantAtom = atomWithStorage<string | null>(
  "currentTenantId",
  null,
);

/**
 * Hook exposing the current tenant id and a setter for updating it.
 * Components can call `setCurrentTenantId` with a tenant id to change the
 * active tenant throughout the application.
 */
export function useCurrentTenantId() {
  const [currentTenantId, setCurrentTenantId] = useAtom(currentTenantAtom);
  return { currentTenantId, setCurrentTenantId };
}
