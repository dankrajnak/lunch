import forms from "@tailwindcss/forms";
import translate3d from "@xpd/tailwind-3dtransforms";

import { join } from "path";
import type { Config } from "tailwindcss";

import { skeleton } from "@skeletonlabs/tw-plugin";

const config = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    join(
      require.resolve("@skeletonlabs/skeleton"),
      "../**/*.{html,js,svelte,ts}"
    ),
  ],
  theme: {
    container: {
      center: true,
    },
    colors: { white: "#fff", black: "#000", transparent: "transparent" },
    extend: {},
  },
  plugins: [
    forms,
    translate3d,
    skeleton({
      themes: { preset: ["skeleton"] },
    }),
  ],
} satisfies Config;

export default config;
