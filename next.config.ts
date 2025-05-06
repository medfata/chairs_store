import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
    GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID,
  },
  images: {
    domains: ['web.whatsapp.com'], // Add WhatsApp domain (though this won't fully resolve the CORS issue)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Provide a default image in case of loading error
    unoptimized: true, // Use unoptimized images to bypass some restrictions
  },
};

export default nextConfig;
