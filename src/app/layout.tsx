import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import coffeeImage from "./coffee.png"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Short link",
  description: "Create a short link to easily share with everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="fixed bottom-0 left-0 w-full bg-blue-600 text-white py-4">
          <div className="text-center">
            &copy; Powered by Vaquata. 
            <Link href={"/about"}>Give me a cup coffee if it`s helpfull for you! <Image className="inline-block" src={coffeeImage} alt="Give me a cup coffee" width={25} height={25} /></Link>
          </div>
        </footer>
        <ToastContainer />
      </body>
    </html>
  );
}
