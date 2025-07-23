const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  // Disable Git integration to avoid native binding issues
  gitTimestamp: false,
  readingTime: false
})

module.exports = withNextra({
  // Webpack configuration to handle potential native module issues
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false
      };
    }
    return config;
  },
  // Disable source maps in production to reduce build size
  productionBrowserSourceMaps: false,
  // Optimize builds
  swcMinify: true,
  // Transpile packages that might have issues
  transpilePackages: ['nextra', 'nextra-theme-docs'],
  experimental: {
    esmExternals: 'loose'
  }
})