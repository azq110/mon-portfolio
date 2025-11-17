
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
/** @type {import('next').NextConfig} */
const nextConfig = {
   outputFileTracingRoot: __dirname,
  experimental: {
    optimizeCss: true,
  },
  typescript: {
    ignoreBuildErrors: true, // ← AJOUTEZ CETTE LIGNE
  },
  /*images: {
    domains: ['cdnjs.cloudflare.com'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },*/
  images: {
  // REMPLACEZ domains par remotePatterns :
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdnjs.cloudflare.com',
    },
  ],
  // dangerouselyAllowSVG: true, // ← Supprimez cette ligne
  contentDispositionType: 'attachment',
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  unoptimized: true, // ← Gardez pour l'instant
},
  compress: true,
  poweredByHeader: false,
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        }
      ],
    },
  ],
  webpack: (config:any) => {
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
        library: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        components: {
          test: /[\\/]components[\\/]/,
          name: 'components',
          chunks: 'all',
          minChunks: 2,
        },
      },
    };
    return config;
  },
}

export default nextConfig
