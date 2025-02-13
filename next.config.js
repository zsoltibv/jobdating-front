if (!URL.canParse(process.env.NEXT_PUBLIC_WORDPRESS_API_URL)) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `);
}

const { protocol, hostname, port, pathname } = new URL(
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL
);

/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.plugins = [
      ...config.plugins,
      new webpack.DefinePlugin({
        __REACT_DEVTOOLS_GLOBAL_HOOK__: "({ isDisabled: true })",
      }),
    ];
    return config;
  },
  reactStrictMode: false,
  basePath: "",
  assetPrefix: "",
  images: {
    domains: ["1.gravatar.com", "cms-wordpress-app.local"],
    remotePatterns: [
      {
        protocol: protocol.slice(0, -1),
        hostname,
        port,
        pathname: `${pathname}/**`,
      },
    ],
  },
};
