import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Обязательно абсолютный путь к репозиторию
  base: "/crypto-app/",
  plugins: [react()],
  root: "../", // Указываем, что index.html находится на уровень выше
  build: {
    outDir: "dist", // Папка сборки будет в корне проекта
    emptyOutDir: true,
  },
});
