/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["lh3.googleusercontent.com"], //Domain of image host

        formats: ["image/avif", "image/webp"],
    },
};

module.exports = nextConfig;
