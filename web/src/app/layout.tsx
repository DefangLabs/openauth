import { Providers } from "@/lib/providers/providers";
import { Roboto } from "next/font/google";
import { Suspense } from "react";
import { Layout } from "../components/layout/layout";
import { Loader } from "@/components/loader/loader";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Defang Portal",
  description: "Welcome to the Defang Opinionated Platform",
};

function RootLayoutInner({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Loader>
      <RootLayoutInner>{children}</RootLayoutInner>
    </Loader>
  );
}
