import { Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

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
  // data-theme="dark"
  return (
    <html lang="en" data-theme="dark">
      <body className={` antialiased min-h-screen transition-all duration-200`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
