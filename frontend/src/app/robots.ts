export default function robots() {
    return {
      rules: [
        { userAgent: "*", allow: "/" },
        { userAgent: "*", disallow: ["/dashboard", "/messages"] }, 
      ],
      sitemap: "http://prime-nest-a9x1.vercel.app/sitemap.xml", 
    };
  }
  