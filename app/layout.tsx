import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider, AppProvider } from "@/context/GlobalContext";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import { Main } from "@/globals/GlobalStyles";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "iSocial",
  description: "Social Media App for Professionals",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <AppProvider>
            <ThemeProvider>
              <Navbar />
              <Main>{children}</Main>
            </ThemeProvider>
          </AppProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
