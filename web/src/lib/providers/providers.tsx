"use client";

import { ApolloProvider } from "@/modules/apollo/providers/apollo-provider/apollo-provider";
import { KratosProvider } from "@/modules/kratos/providers/kratos-provider/kratos-provider";
import { ThemeProvider } from "@/modules/mui/providers/theme-provider/theme-provider";

console.log(
  String.raw`
 _____     ______     ______   ______     __   __     ______    
/\  __-.  /\  ___\   /\  ___\ /\  __ \   /\ "-.\ \   /\  ___\   
\ \ \/\ \ \ \  __\   \ \  __\ \ \  __ \  \ \ \-.  \  \ \ \__ \  
 \ \____-  \ \_____\  \ \_\    \ \_\ \_\  \ \_\\"\_\  \ \_____\ 
  \/____/   \/_____/   \/_/     \/_/\/_/   \/_/ \/_/   \/_____/ 
                                                                
`
);

console.log(`Configuring......`);
console.log(`Fabric: ${process.env.NEXT_PUBLIC_FABRIC}`);
console.log(`FN: ${process.env.NEXT_PUBLIC_FN_URL}`);
console.log(`GraphQL: ${process.env.NEXT_PUBLIC_GRAPHQL_URL}`);
console.log(`Kratos: ${process.env.NEXT_PUBLIC_KRATOS_PUBLIC_URL}`);
console.log(`Let's go......`);

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
