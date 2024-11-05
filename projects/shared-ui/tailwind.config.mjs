import preset from "./src/config/tailwind-preset.config.mjs";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [preset],
  content: [
    "./projects/shared-ui/src/**/*.{html,ts}",
    "./projects/shared-ui/button/src/**/*.{html,ts}",
    "./projects/shared-ui/logo/src/**/*.{html,ts}",
    "./projects/shared-ui/dashboard/src/**/*.{html,ts}",
    "./projects/shared-ui/sidenav/src/**/*.{html,ts}",
    "./projects/shared-ui/input/src/**/*.{html,ts}",
    "./projects/shared-ui/summary/src/**/*.{html,ts}",
    "./projects/shared-ui/table/src/**/*.{html,ts}"
  ],
};
