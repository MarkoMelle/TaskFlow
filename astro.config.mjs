// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
   site: 'https://markomelle.github.io/TaskFlow/',
   base: '/TaskFlow/',
   vite: {
     plugins: [tailwindcss()],
   },
 });
