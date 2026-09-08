import type { Metadata } from "next";
import { Header, Footer } from "@/components/Navigation";
import { QuoteModalProvider } from "@/components/QuoteModal";
import { FloatingQuickWidget } from "@/components/FloatingQuickWidget";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProArch | Architectural Design, Engineering & Cost Estimation",
  description: "Permit-ready drafting, PE-stamped structural & MEP engineering, fabrication shop drawings, photorealistic 3D renders, and 24-48hr construction cost estimates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <QuoteModalProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingQuickWidget />
        </QuoteModalProvider>
      </body>
    </html>
  );
}

