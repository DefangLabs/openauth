import { Providers } from "@/lib/providers/providers";
import { Roboto } from "next/font/google";
import { Suspense } from "react";
import { Layout } from "../components/layout/layout";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Defang Portal",
  description: "Welcome to the Defang Opinionated Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <Layout>
            <Suspense fallback={null}>{children}</Suspense>
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
