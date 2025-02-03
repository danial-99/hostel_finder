/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["res.cloudinary.com", "img.freepik.com"],
    },
    experimental: {
      serverActions: true,
    },
  };
  
  export default nextConfig;
  