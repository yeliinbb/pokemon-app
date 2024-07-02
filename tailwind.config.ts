import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        whitesmoke: "#F5F5F5",
      },
      gridTemplateColumns: {
        //item cards
        "item-cards": "repeat(auto-fill, minmax(200px, 1fr))",
      },
      boxShadow: {
        custom: "0 0 14px 5px rgba(255, 255, 255, 0.3)",
        // custom:
        //   " rgba(255, 255, 255, 0.2) 0px 0px 15px -3px, rgba(255, 255, 255, 0.1) 0px 0px 6px -2px",
      },
    },
  },
  plugins: [],
};
export default config;
