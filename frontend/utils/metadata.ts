import { Metadata } from "next";

export const siteMetadata: Metadata = {
  title: "PrimeNest",
  description: "Find the best real estate deals and properties.",
  keywords: "real estate, property, homes, buy, sell",
  openGraph: {
    title: "My Website - Real Estate Experts",
    description: "Get the best deals on properties in your area.",
    images: [
      {
        url: "https://example.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Real Estate Image",
      },
    ],
    type: "website",
  },
};
