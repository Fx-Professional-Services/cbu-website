import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Catering By Uptown",
  description: "Catering By Uptown",
};

export default function RootLayout({ children }) {
  return (
    <html className="h-full bg-white" lang="en">
      <head>
      </head>
      <body className={`${inter.className} h-full`}>{children}</body>
    </html>
  );
}
