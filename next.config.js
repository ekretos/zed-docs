const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  // Completely disable all Git-related features
  gitTimestamp: false,
  readingTime: false,
  // Disable Git integration entirely
  gitRepo: false,
  gitBranch: false
})

module.exports = withNextra({
  // Environment variables to disable Git features
  env: {
    NEXTRA_GIT_INTEGRATION: 'false',
    NEXTRA_DISABLE_GIT: 'true'
  },
  // Webpack configuration to handle module resolution issues
  webpack: (config, { isServer }) => {
    // Ignore problematic packages during build
    config.externals = config.externals || [];
    if (isServer) {
      config.externals.push('@napi-rs/simple-git');
    }

    // Add resolve fallbacks for client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        child_process: false,
        '@napi-rs/simple-git': false
      };
    }

    // Ignore optional dependencies that cause issues
    config.plugins = config.plugins || [];
    config.plugins.push(
      new config.webpack.IgnorePlugin({
        resourceRegExp: /@napi-rs\/simple-git/
      })
    );

    return config;
  },
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Use SWC minification
  swcMinify: true,
  // Configure module transpilation
  transpilePackages: ['nextra', 'nextra-theme-docs'],
  // Experimental features for better compatibility
  experimental: {
    esmExternals: 'loose'
  },
  // Output configuration for static export
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
})