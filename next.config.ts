import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
  sassOptions: {
    prependData: `@use '@/styles/colors.scss';`,
  },
};

export default nextConfig;
