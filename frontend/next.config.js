/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'i.ytimg.com'
    ],
  }
}

module.exports = nextConfig

/*
se não incluir o dominio  em 'images' o next não carrega a imagem

*/
