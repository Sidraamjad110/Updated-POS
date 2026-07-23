const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.REACT_APP_API_URL ||
  'https://pos.rasantsol.com';

/** Static export for cPanel (upload `out/` folder — no Node.js needed) */
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: API_URL,
    REACT_APP_API_URL: API_URL,
  },
  pageExtensions: ['tsx', 'jsx', 'js'],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
