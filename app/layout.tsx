import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ModalProvider from "@/components/provider/ModalProvider";
import {Toaster} from "sonner"
import ThemeProvider from "@/components/provider/ThemeProvider";
import SWRProvider from "@/components/provider/SWRProvider";
const poppins = Poppins({style:"normal", weight:["400","500","600","700","800","900"], subsets:["latin"]});

export const metadata: Metadata = {
  title: "Paisa",
  description: "Expense tracker pro web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <SWRProvider>
        {children}
          </SWRProvider>
        <ModalProvider/>
        <Toaster richColors />
        </ThemeProvider>
        </body>
    </html>
  );
}
