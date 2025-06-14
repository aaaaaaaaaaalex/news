import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.nytimes.com',
            },
        ],
    },
};

export default nextConfig;
