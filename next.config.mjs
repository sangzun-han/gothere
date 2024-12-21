/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "watwagglbpykwvoasyyq.supabase.co",
      },
    ],
  },
};

export default nextConfig;
