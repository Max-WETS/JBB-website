// @ts-nocheck

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ["jbb-admin.herokuapp.com"],
  },
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.(png|jpe?g|gif)$/i,
  //     use: [
  //       {
  //         loader: "file-loader",
  //       },
  //     ],
  //   });

  //   return config;
  // },
};

module.exports = nextConfig;
