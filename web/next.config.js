// Define individual CSP directives for clarity
const cspDefaultSrc = ["'self'"];
const cspFrameSrc = [
  "'self'", 
  "https://js.stripe.com", 
  "https://intercom-sheets.com", 
  "https://www.intercom-reporting.com",
  "https://www.youtube.com",
  "https://player.vimeo.com",
  "https://fast.wistia.net"
];
const cspImgSrc = [
  "'self'", 
  "data:", 
  "blob:", 
  "https://*.gravatar.com", 
  "http://*.gravatar.com", 
  "https://defang.io", 
  "https://intercomcdn.com", 
  "https://downloads.intercomcdn.com",
  "https://js.intercomcdn.com",
  "https://static.intercomassets.com",
  "https://downloads.intercomcdn.eu",
  "https://downloads.au.intercomcdn.com",
  "https://uploads.intercomusercontent.com",
  "https://gifs.intercomcdn.com",
  "https://video-messages.intercomcdn.com",
  "https://messenger-apps.intercom.io",
  "https://messenger-apps.eu.intercom.io",
  "https://messenger-apps.au.intercom.io",
  "https://*.intercom-attachments-1.com",
  "https://*.intercom-attachments.eu",
  "https://*.au.intercom-attachments.com",
  "https://*.intercom-attachments-2.com",
  "https://*.intercom-attachments-3.com",
  "https://*.intercom-attachments-4.com",
  "https://*.intercom-attachments-5.com",
  "https://*.intercom-attachments-6.com",
  "https://*.intercom-attachments-7.com",
  "https://*.intercom-attachments-8.com",
  "https://*.intercom-attachments-9.com",
  "https://static.intercomassets.eu",
  "https://static.au.intercomassets.com"
];
const cspScriptSrc = [
  "'self'", 
  "'unsafe-inline'", 
  "'unsafe-eval'", 
  "https://js.stripe.com", 
  "https://cdn.segment.com", 
  "https://www.googletagmanager.com", 
  "https://widget.intercom.io", 
  "https://js.intercomcdn.com",
  "https://app.intercom.io"
];
const cspStyleSrc = [
  "'self'", 
  "'unsafe-inline'", 
  "https://fonts.googleapis.com", 
  "https://intercomcdn.com"
];
const cspFontSrc = [
  "'self'", 
  "data:", 
  "https://fonts.gstatic.com", 
  "https://intercomcdn.com",
  "https://js.intercomcdn.com",
  "https://fonts.intercomcdn.com"
];
const cspConnectSrc = [
  "'self'", 
  "https://api.github.com", 
  "https://*.gnafed.click", 
  "https://*.dev.gnafed.click", 
  "https://*.staging.gnafed.click", 
  "https://*.defang.dev", 
  "https://*.defang.io", 
  "https://js.stripe.com", 
  "https://cdn.segment.com", 
  "https://api.segment.io", 
  "https://api-iam.intercom.io",
  "https://nexus-websocket-a.intercom.io", 
  "wss://nexus-websocket-a.intercom.io",
  "https://via.intercom.io",
  "https://api.intercom.io",
  "https://api.au.intercom.io",
  "https://api.eu.intercom.io",
  "https://api-iam.eu.intercom.io",
  "https://api-iam.au.intercom.io",
  "https://api-ping.intercom.io",
  "https://nexus-websocket-b.intercom.io",
  "wss://nexus-websocket-b.intercom.io",
  "https://nexus-europe-websocket.intercom.io",
  "wss://nexus-europe-websocket.intercom.io",
  "https://nexus-australia-websocket.intercom.io",
  "wss://nexus-australia-websocket.intercom.io",
  "https://uploads.intercomcdn.com",
  "https://uploads.intercomcdn.eu",
  "https://uploads.au.intercomcdn.com",
  "https://uploads.eu.intercomcdn.com",
  "https://uploads.intercomusercontent.com"
];

// Add form-action directive as required by Intercom
const cspFormAction = [
  "'self'",
  "https://intercom.help",
  "https://api-iam.intercom.io",
  "https://api-iam.eu.intercom.io",
  "https://api-iam.au.intercom.io"
];

// Add media-src directive as required by Intercom
const cspMediaSrc = [
  "'self'",
  "https://js.intercomcdn.com",
  "https://downloads.intercomcdn.com",
  "https://downloads.intercomcdn.eu",
  "https://downloads.au.intercomcdn.com"
];

const csp = [
  `default-src ${cspDefaultSrc.join(" ")}`,
  `frame-src ${cspFrameSrc.join(" ")}`,
  `img-src ${cspImgSrc.join(" ")}`,
  `script-src ${cspScriptSrc.join(" ")}`,
  `style-src ${cspStyleSrc.join(" ")}`,
  `font-src ${cspFontSrc.join(" ")}`,
  `connect-src ${cspConnectSrc.join(" ")}`,
  `form-action ${cspFormAction.join(" ")}`,
  `media-src ${cspMediaSrc.join(" ")}`
].join("; ");

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
              {
                key: "X-Frame-Options",
                value: "DENY",
              },
              {
                key: "X-Content-Type-Options",
                value: "nosniff",
              },
              {
                key: "X-XSS-Protection",
                value: "1; mode=block",
              },
              {
                key: "Referrer-Policy",
                value: "same-origin",
              },
              {
                key: "Content-Security-Policy",
                value: csp,
              },
              {
                key: "Permissions-Policy",
                value:
                  "geolocation=(), microphone=(), camera=(), interest-cohort=()",
              },
              {
                key: "Feature-Policy",
                value:
                  "geolocation 'none'; microphone 'none'; camera 'none'; interest-cohort 'none'",
              },
            ],
          },
        ];
  },
};

module.exports = nextConfig;
