"use client";

import { ApolloProvider } from "@/modules/apollo/providers/apollo-provider/apollo-provider";
import { KratosProvider } from "@/modules/kratos/providers/kratos-provider/kratos-provider";
import { ThemeProvider } from "@/modules/mui/providers/theme-provider/theme-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <ApolloProvider>
        <KratosProvider>{children}</KratosProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}
