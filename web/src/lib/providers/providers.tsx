"use client";

import { AnalyticsProvider } from "@/modules/analytics/providers/analytics-provider/analytics-provider";
import { ApolloProvider } from "@/modules/apollo/providers/apollo-provider/apollo-provider";
import { ThemeProvider } from "@/modules/mui/providers/theme-provider/theme-provider";

console.log(
  String.raw`
 _____     ______     ______   ______     __   __     ______    
/\  __-.  /\  ___\   /\  ___\ /\  __ \   /\ "-.\ \   /\  ___\   
\ \ \/\ \ \ \  __\   \ \  __\ \ \  __ \  \ \ \-.  \  \ \ \__ \  
 \ \____-  \ \_____\  \ \_\    \ \_\ \_\  \ \_\\"\_\  \ \_____\ 
  \/____/   \/_____/   \/_/     \/_/\/_/   \/_/ \/_/   \/_____/ 
                                                                
`,
);

console.log(`Configuring......`);
console.log(`Auth: ${process.env.NEXT_PUBLIC_AUTH_URL}`);
console.log(`Fabric: ${process.env.NEXT_PUBLIC_FABRIC}`);
console.log(`GraphQL: ${process.env.NEXT_PUBLIC_GRAPHQL_URL}`);
console.log(`Let's go......`);

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AnalyticsProvider>
      <ThemeProvider>
        <ApolloProvider>{children}</ApolloProvider>
      </ThemeProvider>
    </AnalyticsProvider>
  );
}
