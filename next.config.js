/** @type {import('next').NextConfig} */
const nextConfig = {
  runtime: "edge", // for Edge API Routes only
  unstable_allowDynamic: [
    // allows a single file
    "./node_modules/next-auth/**",
  ],
};

module.exports = nextConfig;
