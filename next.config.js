/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: true,
  }
}

module.exports = nextConfig
