import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      clipPath: {
        "rounded-top": "path('M 0 20 Q 50 0 100 20 L 100 100 L 0 100 Z')",
      },

      colors: {
        primary: {
          DEFAULT: "#5952ff", // 기본 Primary 색상
          hover: "#7C73FF", // Primary Hover 색상
        },
        secondary: {
          DEFAULT: "#F2F2F2", // 기본 Secondary 색상 (밝은 회색)
          dark: "#E5E5E5", // Secondary 더 어두운 색상
        },
        text: {
          primary: "#0A0A0A", // 기본 텍스트 색상 (검은색)
          secondary: "#4A4A4A", // 덜 중요한 텍스트 색상 (중간 회색)
        },
      },
      maxWidth: {
        limit: "520px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
