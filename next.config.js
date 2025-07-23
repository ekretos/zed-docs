const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  // Completely disable all Git-related features
  gitTimestamp: false,
  readingTime: false
})

module.exports = withNextra({
  // Webpack configuration to handle module resolution issues
  webpack: (config, { isServer, webpack }) => {
    // More aggressive approach to prevent @napi-rs/simple-git from loading
    config.resolve.alias = {
      ...config.resolve.alias,
      '@napi-rs/simple-git': false,
      '@napi-rs/simple-git/index.js': false
    };

    // Ignore problematic packages during build
    config.externals = config.externals || [];
    if (isServer) {
      config.externals.push(
        '@napi-rs/simple-git',
        '@napi-rs/simple-git-linux-x64-gnu'
      );
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

    // Multiple ignore plugins to catch all variations
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /@napi-rs\/simple-git/
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /simple-git/,
        contextRegExp: /@napi-rs/
      }),
      new webpack.NormalModuleReplacementPlugin(
        /@napi-rs\/simple-git/,
        require.resolve('./mock-git.js')
      )
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
  }
})