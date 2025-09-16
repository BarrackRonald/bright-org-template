/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  experimental: {
    turbo: {
      enabled: false, // 👈 disable Turbopack, force Webpack build
    },
  },
};

module.exports = nextConfig;
