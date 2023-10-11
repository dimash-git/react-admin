/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: ["cdn.generaltradergroup.com"],
  },
  serverRuntimeConfig: {
    // Configure bodyParser size limit here
    bodyParser: {
      sizeLimit: "20mb",
    },
  },
};
