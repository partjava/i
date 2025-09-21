/** @type {import('next').NextConfig} */
const nextConfig = {
  // 基础开发与性能配置
  reactStrictMode: true,       // 开发环境下启用React严格模式，帮助发现问题
  swcMinify: true,             // 生产环境使用SWC压缩，提升构建速度
  
  // 实用的实验性优化（保留经过验证的优化项）
  experimental: {
    optimizeCss: true,         // 优化CSS加载性能
    optimizePackageImports: ['antd'], // 针对antd的导入优化（如果使用antd）
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // 允许的开发环境来源
  allowedDevOrigins: ['www.partjava.com', 'partjava.com', 'localhost'],

  // 关键的HTTP头配置
  async headers() {
    return [
      // 静态资源缓存策略（显著提升重复访问性能）
      {
        source: '/_next/static/(.*)',
        headers: [{
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }]
      },
      // API请求不缓存（确保数据实时性）
      {
        source: '/api/(.*)',
        headers: [{
          key: 'Cache-Control',
          value: 'no-store, max-age=0'
        }]
      },
      // 基础安全策略（根据实际资源调整）
      {
        source: '/(.*)',
        headers: [{
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com https://cdn.jsdelivr.net 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net; connect-src 'self' https:; worker-src 'self' blob:; child-src 'self' blob:"
        }]
      }
    ]
  },

  // 资源优化配置
  images: {
    domains: ['localhost', 'partjava.com'], // 根据实际使用的图片域名配置
    formats: ['image/webp', 'image/avif'],  // 自动转换为现代图片格式
  },
  
  // 字体优化（默认开启，提升字体加载性能）
  optimizeFonts: true,

  // 生产环境优化
  compress: true,              // 启用Gzip压缩
  poweredByHeader: false,      // 移除X-Powered-By头，增强安全性
  output: 'standalone',        // 生成独立部署包，便于容器化
  
  // 代码质量控制（保留严格模式）
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },
  
};

module.exports = nextConfig;
