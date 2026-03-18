import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
  <ClerkProvider>
  <html lang="en">
  <body className="bg-gray-50 text-gray-900">
  <div className="max-w-xl mx-auto p-4">
  <Navbar />
  {children}
  </div>
  </body>
  </html>
  </ClerkProvider>
);
}
