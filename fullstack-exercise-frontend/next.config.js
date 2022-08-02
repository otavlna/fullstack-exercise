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
    domains: ["localhost", "127.0.0.1", "sudety.ch"],
  },
};

module.exports = nextConfig;
