import { PageLoading } from "@/components/page-loading/page-loading";
import { Providers } from "@/lib/providers/providers";
import { Roboto } from "next/font/google";
import { Suspense } from "react";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Defang Portal",
  description: "Welcome to Defang: Develop Once, Deploy Anywhere.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Suspense fallback={<PageLoading />}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
