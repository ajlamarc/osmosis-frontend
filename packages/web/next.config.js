/** @type {import('next').NextConfig} */
const config = {
  target: "serverless",
  basePath: "/apps/osmosis",
  compress: false,
  generateBuildId: async () => {
    return "glob-friendly-id";
  },
  distDir: "build",
  reactStrictMode: false,
  images: {
    domains: ["app.osmosis.zone"],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/:osmosis([a-z0-9-]+\\:0x[a-fA-F0-9]{40})/:path*",
        destination: "/apps/osmosis/:path*?osmosis=:osmosis",
      },
      {
        source: "/:path*",
        destination: "/apps/osmosis/:path*",
      },
    ];
  },
  webpack(config) {
    /**
     * Add sprite.svg to bundle and append hash to revalidate cache when content changes.
     */
    config.module.rules.push({
      test: [/sprite\.svg$/],
      type: "asset/resource",
    });

    /**
     * Avoid using next-image-loader for sprite.svg as it cannot be compiled as successfully given
     * it uses a different svg syntax.
     */
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test(".svg")
    );
    fileLoaderRule.exclude = /sprite\.svg$/;

    return config;
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withTM = require("next-transpile-modules")(["@holium/tome-db"]);

module.exports = withTM(withBundleAnalyzer(config));
