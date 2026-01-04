const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const webpack = require('webpack');
const { join } = require('path');

module.exports = {
  cache: false,
  target: 'node', // Node target
  externals: {
    // Optional MongoDB dependencies
    kerberos: 'commonjs kerberos',
    snappy: 'commonjs snappy',
    socks: 'commonjs socks',
    aws4: 'commonjs aws4',
    'gcp-metadata': 'commonjs gcp-metadata',
    '@aws-sdk/credential-providers': 'commonjs @aws-sdk/credential-providers',
    '@mongodb-js/zstd': 'commonjs @mongodb-js/zstd',
    bufferutil: 'commonjs bufferutil',
    'utf-8-validate': 'commonjs utf-8-validate',
  },
  ignoreWarnings: [
    { message: /Failed to parse source map/ },
    { module: /node_modules\/iterare\/lib\// },
  ],
  resolve: {
    fallback: {
      bufferutil: false,
      'utf-8-validate': false,
    },
  },
  output: {
    path: join(__dirname, 'dist'),
  },
  plugins: [
    new webpack.IgnorePlugin({ resourceRegExp: /^@nestjs\/microservices(\/.*)?$/ }),
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc', // Use tsc, not Babel
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false, // optional for dev
      outputHashing: 'none',
      generatePackageJson: true,
      sourceMaps: true,
    }),
  ],
};
