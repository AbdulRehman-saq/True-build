import type { Metadata, Viewport } from "next";
import { Header, Footer } from "@/components/Navigation";
import { QuoteModalProvider } from "@/components/QuoteModal";
import { ModelExplorerProvider } from "@/components/ModelExplorer3DModal";
import { ScrollProgressBar } from "@/components/FramerMotion";
import { FloatingQuickWidget } from "@/components/FloatingQuickWidget";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://proarchestdesign.com';

export const viewport: Viewport = {
  themeColor: '#12161F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ProArch | Architectural Design, PE Engineering & Construction Estimation",
    template: "%s | ProArch Design & Estimation",
  },
  description: "Permit-ready drafting, PE-stamped structural & MEP engineering across 11 states, fabrication shop drawings, photorealistic 3D renders, and 24-48hr construction cost estimates.",
  keywords: [
    "architectural drafting services",
    "permit-ready floor plans",
    "PE stamped structural engineering",
    "MEP engineering",
    "construction cost estimation",
    "material takeoff services",
    "fabrication shop drawings",
    "structural steel shop drawings",
    "photorealistic 3D architectural rendering",
    "BIM modeling services",
    "custom home blueprints",
    "ADU plans drafting",
    "commercial construction takeoff",
    "foundation design engineering",
    "Texas PE structural engineer",
    "Florida PE engineer",
    "California engineering stamp",
    "Dallas architectural drafting",
    "ProArch Design and Estimation",
  ],
  authors: [{ name: "ProArch Design & Estimation", url: siteUrl }],
  creator: "ProArch Design & Estimation",
  publisher: "ProArch Design & Estimation",
  applicationName: "ProArch",
  category: "construction",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ProArch | Architectural Design, PE Engineering & Cost Estimation",
    description: "Permit-ready drafting, PE-stamped engineering across 11 states, submittal-ready fabrication shop drawings, photorealistic 3D renders, and 24-48hr construction cost estimates.",
    url: siteUrl,
    siteName: "ProArch Design & Estimation",
    images: [
      {
        url: "/images/hero_architecture.jpg",
        width: 1200,
        height: 630,
        alt: "ProArch Architectural Design, Engineering & Estimation Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProArch | Architectural Design, PE Engineering & Cost Estimation",
    description: "Permit-ready drafting, PE-stamped engineering, shop drawings, 3D rendering, and 24-48hr construction cost estimates.",
    images: ["/images/hero_architecture.jpg"],
    creator: "@ProArchEst",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico' },
      { url: '/ProArch_Logo_Design&Estimation.png' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  manifest: "/manifest.webmanifest",
  other: {
    "geo.region": "US-TX",
    "geo.placename": "Dallas",
    "geo.position": "32.8872;-96.8837",
    "ICBM": "32.8872, -96.8837",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://proarchestdesign.com/#organization",
      name: "ProArch Design & Estimation",
      alternateName: "ProArch",
      url: "https://proarchestdesign.com",
      logo: "https://proarchestdesign.com/ProArch_Logo_Design&Estimation.png",
      image: "https://proarchestdesign.com/images/hero_architecture.jpg",
      description:
        "Permit-ready drafting, PE-stamped structural & MEP engineering across 11 states, submittal-ready fabrication shop drawings, photorealistic 3D renders, and 24-48hr construction cost estimates.",
      telephone: "+1-832-737-3912",
      email: "info@proarchestdesign.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Shady Trail PMB 242",
        addressLocality: "Dallas",
        addressRegion: "TX",
        postalCode: "75229",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 32.8872,
        longitude: -96.8837,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
      ],
      areaServed: [
        { "@type": "State", name: "Texas" },
        { "@type": "State", name: "Florida" },
        { "@type": "State", name: "California" },
        { "@type": "State", name: "Georgia" },
        { "@type": "State", name: "Colorado" },
        { "@type": "State", name: "Massachusetts" },
        { "@type": "State", name: "Arizona" },
        { "@type": "State", name: "Utah" },
        { "@type": "State", name: "Kentucky" },
        { "@type": "State", name: "North Carolina" },
        { "@type": "State", name: "South Carolina" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Design & Engineering Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Architectural Drafting & Permit Sets",
              description: "Permit-ready site plans, floor plans, elevations, electrical layouts, roof plans, and window/door schedules.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "PE-Stamped Structural & MEP Engineering",
              description: "Licensed structural calculations, foundation designs, MEP layouts, and load-bearing assessments in 11 US states.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Fabrication Shop Drawings",
              description: "Submittal-ready structural steel erection plans, rebar detailing, precast concrete, and MEP coordination.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Photorealistic 3D Rendering & Animation",
              description: "High-fidelity 4K interior and exterior 3D architectural renders, daylighting simulations, and walkthrough animations.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Construction Cost Estimation & Material Takeoffs",
              description: "24-48hr turnaround construction cost estimating and comprehensive itemized material takeoffs with 95-97% accuracy.",
            },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <QuoteModalProvider>
          <ModelExplorerProvider>
            <ScrollProgressBar />
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <FloatingQuickWidget />
          </ModelExplorerProvider>
        </QuoteModalProvider>
      </body>
    </html>
  );
}

