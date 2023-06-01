"use client";

import { KratosProvider } from "@/modules/kratos/providers/kratos-provider/kratos-provider";
import { ThemeProvider } from "@/modules/mui/providers/theme-provider/theme-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <KratosProvider>{children}</KratosProvider>
    </ThemeProvider>
  );
}
