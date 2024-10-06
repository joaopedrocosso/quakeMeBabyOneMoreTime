import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { BottomNavBar } from "@/components/BottomNavBar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Quake Me Baby One More Time",
  description: "Tackling the challenges of planetary seismology with precision and creativity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
        <BottomNavBar />
      </body>
    </html>
  );
}
