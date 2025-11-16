// app/metadataConfig.js
export const metadataConfig = {
  homepage: {
    title: "BFT – Professional Mobile Forensic Tool | Home",
    description:
      "Discover BFT, the leading mobile forensic tool for Android & iOS devices. Explore features, news, and updates for forensic professionals.",
    keywords:
      "BFT, Mobile Forensic Tool, Android Forensics, iOS Forensics, Mobile Security, Updates",
    author: "BFT Team",
    robots: "index, follow",
  },
  profile: {
    title: "BFT – User Profile | Mobile Forensic Dashboard",
    description:
      "Manage your BFT account, track your activities, and access forensic tools tailored for mobile investigations.",
    keywords: "BFT, Profile, Dashboard, Mobile Forensics",
    author: "BFT Team",
    robots: "noindex, nofollow", // معمولاً صفحات پروفایل ایندکس نمی‌شوند
  },
  models: {
    title: "BFT – Supported Mobile Models | Forensic Tool",
    description:
      "Explore all mobile phone models supported by BFT. Check compatibility and details for professional mobile forensics.",
    keywords: "BFT, Mobile Models, Forensics, Android, iOS",
    author: "BFT Team",
    robots: "index, follow",
  },
  "models/[id]": (phoneModels) => ({
    title: `BFT – ${phoneModels} Models | Mobile Forensic Tool`,
    description: `Get complete forensic information and analysis options for ${phoneModels} using BFT, the professional mobile forensic tool.`,
    keywords: `BFT, ${phoneModels}, Mobile Forensics, Android, iOS, Model Details`,
    author: "BFT Team",
    robots: "index, follow",
  }),
  
  signup: {
    title: "BFT – Sign Up | Mobile Forensic Tool",
    description:
      "Create your BFT account to access professional mobile forensic tools and updates.",
    keywords: "BFT, Sign Up, Mobile Forensics, Account",
    author: "BFT Team",
    robots: "noindex, nofollow", // معمولاً صفحات ثبت‌نام ایندکس نمی‌شوند
  },
  signin: {
    title: "BFT – Sign In | Mobile Forensic Tool",
    description:
      "Sign in to your BFT account and manage mobile forensic analysis efficiently.",
    keywords: "BFT, Sign In, Mobile Forensics, Account",
    author: "BFT Team",
    robots: "noindex, nofollow",
  },
  
};
