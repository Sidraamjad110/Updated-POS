const NextFederationPlugin = require('@module-federation/nextjs-mf');

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.REACT_APP_API_URL ||
  'https://imaging-larger-trusted-pci.trycloudflare.com';

module.exports = {
  env: {
    NEXT_PUBLIC_API_URL: API_URL,
    REACT_APP_API_URL: API_URL,
  },
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'remoteApp',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Header': './src/components/Header.tsx',
          './Sidebar': './src/components/Sidebar.tsx',
          './Footer': './src/components/Footer.tsx',
        },
        remotes: {
          host: `host@http://localhost:3002/_next/static/${
            isServer ? 'ssr' : 'chunks'
          }/remoteEntry.js`, // Align with host
        },
        shared: {
          react: {
            singleton: true,
            eager: true,
            requiredVersion: require('react/package.json').version,
          },
          'react-dom': {
            singleton: true,
            eager: true,
            requiredVersion: require('react-dom/package.json').version,
          },
          'next/router': {
            singleton: true,
            eager: true,
            requiredVersion: require('next/package.json').version,
          },
          'shared-tailwind': { singleton: true, eager: true, requiredVersion: false },
        },
      })
    );
    return config;
  },
};