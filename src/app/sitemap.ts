import fs from "fs";
import type { MetadataRoute } from "next";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://telephotos.app";

  const staticPages = [
    { path: "/", priority: 1.0, changeFreq: "weekly" as const },
    { path: "/features", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/how-it-works", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/faq", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/about", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/contact", priority: 0.6, changeFreq: "yearly" as const },
    { path: "/privacy", priority: 0.4, changeFreq: "yearly" as const },
    { path: "/terms", priority: 0.4, changeFreq: "yearly" as const },
  ];

  let blogSlugs: string[] = [];
  try {
    const blogDir = path.join(process.cwd(), "src/app/blog");
    blogSlugs = fs
      .readdirSync(blogDir)
      .filter((file) => {
        const isDir = fs.statSync(path.join(blogDir, file)).isDirectory();
        return isDir && !file.startsWith("[") && !file.startsWith(".");
      });
  } catch (error) {
    console.warn("Could not read blog directory during sitemap generation", error);
  }

  const staticEntries = staticPages.map(({ path, priority, changeFreq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority,
  }));

  const blogEntries = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
