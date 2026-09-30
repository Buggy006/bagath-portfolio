/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — the site is served from S3 behind CloudFront (see infra/)
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
