import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@hooks": path.resolve(__dirname, "src/hooks"),
            "@components": path.resolve(__dirname, "src/components"),
            "@validations": path.resolve(__dirname, "src/validations"),
            "@providers": path.resolve(__dirname, "src/providers"),
        },
    },
    define: {
        global: 'window', // ← Ajouté pour résoudre l'erreur avec SockJS
    },
});
