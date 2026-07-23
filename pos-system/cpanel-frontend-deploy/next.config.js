const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.REACT_APP_API_URL ||
  'https://pos.rasantsol.com';

/** Single-app Next.js config — no Module Federation / remote-app */
module.exports = {
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
