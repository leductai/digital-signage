const withCSS = require('@zeit/next-css')
const webpack = require('webpack')

module.exports = withCSS({
  cssLoaderOptions: {
    url: false
  },
  webpack: (config, { isServer }) => {
    // Ignore Node.js modules that can't be bundled for client-side
    if (!isServer) {
      config.plugins.push(
        new webpack.IgnorePlugin({
          checkResource(resource, context) {
            // Ignore term-size and child_process modules
            if (/term-size/.test(resource) || /child_process/.test(resource)) {
              return true
            }
            // Ignore fs, path, os when imported from dotenv or other Node modules
            if (context.includes('node_modules') && /^(fs|path|os)$/.test(resource)) {
              return true
            }
            return false
          }
        })
      )
    }
    return config
  }
})
