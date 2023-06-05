import { useEffect } from "react";
import { useUpdateSession } from "../../hooks/use-update-session/use-update-session";

interface KratosProviderProps {
  children: React.ReactNode;
}

export function KratosProvider({ children }: KratosProviderProps) {
  const updateSession = useUpdateSession();
  useEffect(() => {
    updateSession();
  }, [updateSession]);
  return <>{children}</>;
}
