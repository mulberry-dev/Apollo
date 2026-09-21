const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false
  },
  experimental: {
    optimizePackageImports: ["sweetalert2", "@next/third-parties"]
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**"
      },
      { protocol: "https", hostname: "i.ibb.co", pathname: "/**" },
      {
        protocol: "https",
        hostname: "sass-lang.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "nodemailer.com",
        pathname: "/**"
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/portfolio/SalonTarget",
        destination: "/portfolio/SaasProject",
        permanent: true
      },
      {
        source: "/es/portfolio/SalonTarget",
        destination: "/es/portfolio/SaasProject",
        permanent: true
      }
    ]
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
