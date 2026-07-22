const path = require('path');

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.REACT_APP_API_URL ||
  'https://imaging-larger-trusted-pci.trycloudflare.com';

// cPanel / production build: bundle remotes locally (no localhost Module Federation)
const useLocalRemotes = process.env.CPANEL_BUILD === '1' || process.env.NODE_ENV === 'production';

module.exports = {
  env: {
    NEXT_PUBLIC_API_URL: API_URL,
    REACT_APP_API_URL: API_URL,
  },
  // Exclude *.ts type files under pages/ from being treated as routes
  pageExtensions: ['tsx', 'jsx', 'js'],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Allow importing Header/Footer from sibling remote-app
  experimental: {
    externalDir: true,
  },
  webpack: (config, options) => {
    const { isServer } = options;

    if (useLocalRemotes) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        'remoteApp/Header': path.resolve(
          __dirname,
          '../remote-app/src/components/Header.tsx'
        ),
        'remoteApp/Footer': path.resolve(
          __dirname,
          '../remote-app/src/components/Footer.tsx'
        ),
        'remoteApp/Sidebar': path.resolve(
          __dirname,
          '../remote-app/src/components/Sidebar.tsx'
        ),
      };
      return config;
    }

    config.plugins.push(
      new options.webpack.container.ModuleFederationPlugin({
        name: 'host',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          remoteApp:
            'remoteApp@http://localhost:3001/_next/static/chunks/remoteEntry.js',
        },
        shared: {
          'next/router': {
            singleton: true,
            eager: true,
            requiredVersion: false,
          },
          'next/link': {
            singleton: true,
            eager: true,
            requiredVersion: false,
          },
          react: {
            singleton: true,
            eager: true,
            requiredVersion: false,
          },
          'react-dom': {
            singleton: true,
            eager: true,
            requiredVersion: false,
          },
        },
      })
    );

    return config;
  },
};
