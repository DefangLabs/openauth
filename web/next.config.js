/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/service",
        destination: "/projects",
        permanent: true,
      },
    ];
  },
  // experimental: {
  //   missingSuspenseWithCSRBailout: false, // shouldn't be necessary but build is not detecting Suspense boundaries
  // },
  async headers() {
    return process.env.NODE_ENV !== "production"
      ? []
      : [
          {
            source: "/(.*)",
            headers: [
              {
                key: "Strict-Transport-Security",
                value: "max-age=31536000; includeSubDomains; preload",
              },
              // {
              //   key: "X-Frame-Options",
              //   value: "DENY",
              // },
              // {
              //   key: "X-Content-Type-Options",
              //   value: "nosniff",
              // },
              // {
              //   key: "X-XSS-Protection",
              //   value: "1; mode=block",
              // },
              // {
              //   key: "Referrer-Policy",
              //   value: "same-origin",
              // },
              // {
              //   key: "Content-Security-Policy",
              //   value: "default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' https://api.github.com",
              // },
              // {
              //   key: "Permissions-Policy",
              //   value: "geolocation=(), microphone=(), camera=(), interest-cohort=()",
              // },
              // {
              //   key: "Feature-Policy",
              //   value: "geolocation 'none'; microphone 'none'; camera 'none'; interest-cohort 'none'",
              // },
            ],
          },
        ];
  },
};

module.exports = nextConfig;
