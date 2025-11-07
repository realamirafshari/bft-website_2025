import { Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/layout/Header";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Brutal Forensic Tool",
  description: "Professional Mobile Forensic Tool ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} antialiased bg-base-100 min-h-screen`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
