import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Catering By Uptown",
  description: "Catering By Uptown",
};

export default function RootLayout({ children }) {
  return (
    <html class="h-full bg-white" lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} h-full`}>{children}</body>
    </html>
  );
}
