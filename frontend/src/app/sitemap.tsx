import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "http://prime-nest-a9x1.vercel.app";

  return [
    { url: `${siteUrl}/`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/properties`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/dashboard`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/messages`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/messages/123`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/property/1`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/property/2`, lastModified: new Date().toISOString() },
    { url: `${siteUrl}/property/3`, lastModified: new Date().toISOString() },
  ];
}
