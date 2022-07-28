/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async redirects() {
    return [
      {
        source: "/",
        destination: "/articles",
        permanent: true,
      },
    ];
  },

  images: {
    domains: ["localhost"],
  },
};

module.exports = nextConfig;
