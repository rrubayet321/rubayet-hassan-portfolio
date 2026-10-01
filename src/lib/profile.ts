export const profile = {
  name: "Rubayet Hassan",
  title: "AI Software Engineer",
  location: "Dhaka, Bangladesh",
  employer: "StorageAtlas",
  employerUrl: "https://storageatlas.co/",
  introduction:
    "I build software and AI products that help businesses work smarter, serve customers better, and grow revenue.",
  currentWork:
    "I build and maintain the platform, website, and dialer—from technical planning to the fixes that keep them running.",
  email: "rrubayet321@gmail.com",
  github: "https://github.com/rrubayet321",
  linkedin: "https://www.linkedin.com/in/rubayet-hassan2",
} as const;
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rubayethassan.com"
).replace(/\/$/, "");
