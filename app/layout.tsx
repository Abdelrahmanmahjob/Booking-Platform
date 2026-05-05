import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { themeScript } from "@/lib/theme-script";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Navbar } from "@/components/shared/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BookIt | Professional Booking Platform",
  description: "Book professional services with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>
      <body suppressHydrationWarning className={font.className}>
        <Providers>
          <Navbar />
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </Providers>
      </body>
    </html>
  );
}
