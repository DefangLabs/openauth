import { KratosContext, kratosContextDefaultValue } from "../../contexts/kratos-context/kratos-context";

interface KratosProviderProps {
  children: React.ReactNode;
}

export function KratosProvider({ children }: KratosProviderProps) {
  return (
    <KratosContext.Provider value={kratosContextDefaultValue}>
      {children}
    </KratosContext.Provider>
  );
}
