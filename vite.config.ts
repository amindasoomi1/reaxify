import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({ entryRoot: "src", exclude: ["**/*.stories.tsx"] }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      name: "reaxify",
      entry: {
        index: "src/index.ts",
        axios: "src/axios/index.ts",
        components: "src/components/index.ts",
        helpers: "src/helpers/index.ts",
        hooks: "src/hooks/index.ts",
        providers: "src/providers/index.ts",
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        dir: "dist",
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name]/index.[format].js",
        globals: { react: "React", "react-dom": "ReactDom" },
      },
    },
  },
});
