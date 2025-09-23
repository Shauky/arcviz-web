
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  webpack(config) {
    // Add rule for handling .glb files
    config.module.rules.push({
      test: /\.(glb|gltf|obj|fbx|stl)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/chunks/[name].[hash][ext]', // Ensure proper output path
      },
    });

    return config;
  },
};

module.exports = nextConfig;