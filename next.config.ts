import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three'],

  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    });

    return config;
  }
};

export default nextConfig;
