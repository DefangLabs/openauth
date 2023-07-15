/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    modularizeImports: {
      "@mui/icons-material": {
        transform: "@mui/icons-material/{{member}}",
      },
    },
  },
};

module.exports = nextConfig;
