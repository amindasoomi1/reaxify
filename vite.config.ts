import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
// import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ entryRoot: "src", exclude: ["**/*.stories.tsx", "**/internal.ts"] }),
    // viteStaticCopy({ targets: [{ src: "./src/types", dest: "" }] }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      name: "reaxify",
      entry: [
        "src/index.ts",
        "src/axios/index.ts",
        "src/components/index.ts",
        "src/helpers/index.ts",
        "src/hooks/index.ts",
        "src/providers/index.ts",
      ],
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "axios"],
      output: {
        banner: '"use client";',
        dir: "dist",
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: ({ facadeModuleId }) => {
          // const cleanName = name.replace(/\/index$/, "");
          // return `${cleanName}/index.[format].js`;
          const relativePath = facadeModuleId
            ?.split("src/")[1]
            ?.replace(/\.ts(x)?$/, "");
          if (!relativePath) return `[name].[format].js`;
          if (relativePath.endsWith("/index")) {
            return `${relativePath.replace(/\/index$/, "")}/index.[format].js`;
          }
          return `${relativePath}.[format].js`;
        },
        globals: { react: "React", "react-dom": "ReactDom" },
      },
    },
  },
});
