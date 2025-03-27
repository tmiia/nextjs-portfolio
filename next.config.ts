import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.storyblok.com',
      },
    ],
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    });

    return config;
  }
};

export default nextConfig;
