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
        child_process: false
      };
    }
    
    // Ignore optional dependencies that cause issues
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.IgnorePlugin({
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
  }
})