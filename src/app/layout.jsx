import "./globals.css";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import NextAuthProvider from "@/providers/NextAuthProvider";
import Head from "next/head";

export const metadata = {
  title: "Brutal Forensic Tool",
  description: "Professional Mobile Forensic Tool ",
};

export default function RootLayout({ children }) {
  // data-theme="dark"
  return (
    <html lang="en" data-theme="dark">
      
      <body className={` antialiased min-h-screen transition-all duration-200`}>
        <NextAuthProvider>
          <Header />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
