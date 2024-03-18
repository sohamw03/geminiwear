/** @type {import('next').NextConfig} */
const nextConfig = {
  runtime: "edge", // for Edge API Routes only
  unstable_allowDynamic: [
    // allows a single file
    "./node_modules/next-auth/node_modules/@babel/runtime/regenerator/index.js",
    "./node_modules/next-auth/react/index.js",
  ],
};

module.exports = nextConfig;
