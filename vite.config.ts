import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => ({

    base:

        command === "serve"

            ? "/"

            : "/family-records-explorer/",

    plugins: [

        react(),

        tailwindcss(),

    ],

}));