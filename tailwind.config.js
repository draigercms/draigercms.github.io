/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.html",
    "./src/**/*.njk",
    "./src/**/*.md",
    "./src/**/*.js",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        slate: {
          css: {
            "--tw-prose-headings": theme("colors.slate.800"),
            "--tw-prose-lead": theme("colors.slate.800"),
            "--tw-prose-bold": theme("colors.slate.800"),
            "--tw-prose-links": theme("colors.slate.800"),
            a: {
              fontWeight: "normal",
              textDecoration: "underline",
              textDecorationThickness: "1px",
              textUnderlineOffset: "4px",
              textDecorationColor: theme("colors.slate.800"),
              "&:hover": {
                textDecorationColor: theme("colors.slate.400"),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
