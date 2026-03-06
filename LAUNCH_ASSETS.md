# Phase 4: Off-Page SEO & Launch Assets

To execute Phase 4 (Backlinks & Authority Building), you need to list Telephotos on major web directories and launch platforms. Because I cannot bypass captchas and login walls to submit these forms for you, I have prepared extremely optimized, high-converting copy for you to copy-paste into these platforms!

Getting listed on these three sites gives you high-Domain-Authority (DA) backlinks which dramatically boost your Google rankings.

---

## 1. Product Hunt Launch Copy
Product Hunt is crucial for getting initial backlinks and tech-savvy early adopters.

**Product Name:** Telephotos
**Tagline (Under 60 chars):** Unlimited free photo storage cloud powered by Telegram.
**Topics/Tags:** Photography, Cloud Storage, Privacy, Developer Tools

**Description (260 characters max):** 
Transform your Telegram account into an unlimited, free photo storage gallery. Telephotos gives you a beautiful grid dashboard to organize uncompressed memories securely in your private Telegram cloud. Say goodbye to "Storage Full" popups forever.

**Maker Comment (First comment on the post):**
```text
Hey Product Hunt! 👋

I’m thrilled to introduce Telephotos. Like many of you, I got completely fed up with platforms like Google Photos and iCloud forcing me into expensive monthly subscriptions just to store my family memories and 4K videos. 

I realized Telegram offers an incredible feature: unlimited cloud storage in "Saved Messages" and Private Channels. The only problem? Navigating thousands of photos in a chat interface is a nightmare.

So, I built Telephotos. It acts strictly as a secure, blazing-fast frontend dashboard that bridges directly to your official Telegram API. 

✨ **Key Features:**
- ☁️ **Absolute Zero Fees:** Unlimited storage at original quality, forever.
- 🔒 **Zero-Knowledge Architecture:** We don't host your files. They stay encrypted in your Telegram channels.
- 🖼️ **Stunning UI:** Lazy-loaded grid gallery, channel albums, and fast batch uploads.

I'd love your feedback! Drop any questions below and I'll be here all day answering them.
```

---

## 2. AlternativeTo.net Submission
AlternativeTo ranks incredibly high on Google when people search "Alternative to Google Photos".

**App Name:** Telephotos
**Category:** Photos & Graphics > Image Hosting
**License:** Free

**Short Description:**
A private, decentralized photo gallery interface that utilizes Telegram's unlimited cloud storage.

**Long Description (Markdown enabled):**
Telephotos is a modern, web-based photo storage gallery that solves the problem of expensive cloud subscriptions. It leverages the official Telegram API to use your personal Telegram account as the storage backend.

Since Telegram offers unlimited file storage for its users, Telephotos provides a dedicated, beautiful, grid-based dashboard to view those files instead of endlessly scrolling through a chat interface. 

**Main features:**
- **Store unlimited photos and videos** for absolutely zero cost.
- **Uncompressed Quality:** Uploads bypass chat compression, retaining full EXIF data and original resolution.
- **Zero-Knowledge Privacy:** Telephotos does not have a database of your images. Files are strictly uploaded to and fetched from your private, encrypted Telegram channels.
- **Dynamic Organization:** Automatically map your Telegram channels into neat photo albums.

If you are looking for a free, privacy-first alternative to iCloud or Google Photos, Telephotos provides the perfect decentralized bridge.

---

## 3. Hacker News "Show HN" Template

**Title:** `Show HN: Telephotos – I turned Telegram into an unlimited, free Google Photos clone`

**Body:**
```text
Hi HN,

I was tired of paying monthly fees for cloud storage and noticed that Telegram offers unlimited 2GB file storage for free in private channels. The UX for treating a chat app as a photo drive is terrible, so I built a dedicated gallery frontend for it: Telephotos (https://telephotos.app).

It uses the official Telegram MTProto API under the hood. You log in securely, and it either reads your existing private media channels or creates new ones to act as "Albums". 

When you drag-and-drop a batch of photos into the UI, it sends them as uncompressed 'Documents' directly to Telegram's infrastructure. The Telephotos backend is entirely stateless regarding your media — we store zero images, and act purely as an authorized web client rendering Telegram's response into a masonry grid.

Tech Stack:
- Next.js / React
- Telegram MTProto (GramJS)
- Tailwind + Framer Motion

Because we don't host the heavy loads, the infrastructure costs effectively nothing to run, which is how it remains free. I'd love to hear your thoughts on this architecture and any feedback you have on the UI!
```

---

## 4. Google Search Console Check-list
Make sure you perform these final steps inside **Google Search Console**:
1. Copy the URL `https://telephotos.app/sitemap.xml` and paste it into the **Sitemaps** tab in GSC.
2. Go to the **URL Inspection** tool, type in `https://telephotos.app/blog/how-to-use-telegram-as-unlimited-cloud-storage` and click **"Request Indexing"** to force Google to crawl your new SEO changes immediately!
