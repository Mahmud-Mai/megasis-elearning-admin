/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "www.youtube.com", protocol: "https" },
      { hostname: "www.facebook.com", protocol: "https" },
      { hostname: "res.cloudinary.com" }
    ]
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false
      }
    };
    return config;
  }
};

export default nextConfig;
