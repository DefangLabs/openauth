import { Providers } from "@/helpers/providers/providers";
import { Inter } from "next/font/google";
import { Layout } from "./components/layout/layout";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
