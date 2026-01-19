/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Unsplash Images වලට අවසර දීම
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me', // Random User Images වලට අවසර දීම
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // Sanity Images (අනාගතය සඳහා)
      }
    ],
  },
};

export default nextConfig;