import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { Variable } from "lucide-react";
import { Toaster } from "sonner";
import { SessionProvider } from "./session.context";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Projet",
  description: "projet web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <ClerkProvider 
        appearance={{
          layout:{
            logoImageUrl:'assets/logo.svg',
            socialButtonsVariant:'iconButton',
            
          },
          variables: {
            colorPrimary: "blue",
            colorText:'#fff',
            colorBackground:"#1C1F2E",
            colorInputBackground:"#252a41",
            colorInputText:'#fff',
          },
        }}
      > */}

        <SessionProvider>
          <body className='dark bg-mainbg-1'>
            {children}
            <Toaster></Toaster>
          </body>
        </SessionProvider>


      {/* </ClerkProvider> */}
    </html>
  );
}
