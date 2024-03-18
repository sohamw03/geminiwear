/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true, // Required for Next.js 13+
      };
      config.module.rules.push({
        test: /\.\/node_modules\/next\-auth\/node_modules\/@babel\/runtime\/regenerator\/index\.js/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["babel-plugin-import-dynamic"], // Might be necessary
          },
        },
      });
    }

    return config;
  },
  unstable_allowDynamic: ["./node_modules/next-auth/react/index.js"], // Add additional paths if needed
};

module.exports = nextConfig;
