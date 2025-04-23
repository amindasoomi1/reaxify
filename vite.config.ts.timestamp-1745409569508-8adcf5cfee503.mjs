// vite.config.ts
import tailwindcss from "file:///C:/Users/persina%20gold/Desktop/npm/reaxify/node_modules/@tailwindcss/vite/dist/index.mjs";
import react from "file:///C:/Users/persina%20gold/Desktop/npm/reaxify/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { defineConfig } from "file:///C:/Users/persina%20gold/Desktop/npm/reaxify/node_modules/vite/dist/node/index.js";
import dts from "file:///C:/Users/persina%20gold/Desktop/npm/reaxify/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\persina gold\\Desktop\\npm\\reaxify";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    dts({ entryRoot: "src", exclude: ["**/*.stories.tsx", "**/internal.ts"] }),
    tailwindcss()
    // viteStaticCopy({ targets: [{ src: "./src/types", dest: "" }] }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
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
        "src/providers/index.ts"
      ],
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: ["react", "react-dom", "axios"],
      output: {
        dir: "dist",
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: ({ facadeModuleId }) => {
          const relativePath = facadeModuleId?.split("src/")[1]?.replace(/\.ts(x)?$/, "");
          if (!relativePath) {
            return `[name].[format].js`;
          }
          if (relativePath.endsWith("/index")) {
            return `${relativePath.replace(/\/index$/, "")}/index.[format].js`;
          }
          return `${relativePath}.[format].js`;
        },
        globals: { react: "React", "react-dom": "ReactDom" }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxwZXJzaW5hIGdvbGRcXFxcRGVza3RvcFxcXFxucG1cXFxccmVheGlmeVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccGVyc2luYSBnb2xkXFxcXERlc2t0b3BcXFxcbnBtXFxcXHJlYXhpZnlcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3BlcnNpbmElMjBnb2xkL0Rlc2t0b3AvbnBtL3JlYXhpZnkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSBcIkB0YWlsd2luZGNzcy92aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgZHRzIGZyb20gXCJ2aXRlLXBsdWdpbi1kdHNcIjtcbi8vIGltcG9ydCB7IHZpdGVTdGF0aWNDb3B5IH0gZnJvbSBcInZpdGUtcGx1Z2luLXN0YXRpYy1jb3B5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIGR0cyh7IGVudHJ5Um9vdDogXCJzcmNcIiwgZXhjbHVkZTogW1wiKiovKi5zdG9yaWVzLnRzeFwiLCBcIioqL2ludGVybmFsLnRzXCJdIH0pLFxuICAgIHRhaWx3aW5kY3NzKCksXG4gICAgLy8gdml0ZVN0YXRpY0NvcHkoeyB0YXJnZXRzOiBbeyBzcmM6IFwiLi9zcmMvdHlwZXNcIiwgZGVzdDogXCJcIiB9XSB9KSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIGxpYjoge1xuICAgICAgbmFtZTogXCJyZWF4aWZ5XCIsXG4gICAgICBlbnRyeTogW1xuICAgICAgICBcInNyYy9pbmRleC50c1wiLFxuICAgICAgICBcInNyYy9heGlvcy9pbmRleC50c1wiLFxuICAgICAgICBcInNyYy9jb21wb25lbnRzL2luZGV4LnRzXCIsXG4gICAgICAgIFwic3JjL2hlbHBlcnMvaW5kZXgudHNcIixcbiAgICAgICAgXCJzcmMvaG9va3MvaW5kZXgudHNcIixcbiAgICAgICAgXCJzcmMvcHJvdmlkZXJzL2luZGV4LnRzXCIsXG4gICAgICBdLFxuICAgICAgZm9ybWF0czogW1wiZXNcIiwgXCJjanNcIl0sXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBleHRlcm5hbDogW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIiwgXCJheGlvc1wiXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBkaXI6IFwiZGlzdFwiLFxuICAgICAgICBwcmVzZXJ2ZU1vZHVsZXM6IHRydWUsXG4gICAgICAgIHByZXNlcnZlTW9kdWxlc1Jvb3Q6IFwic3JjXCIsXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAoeyBmYWNhZGVNb2R1bGVJZCB9KSA9PiB7XG4gICAgICAgICAgLy8gY29uc3QgY2xlYW5OYW1lID0gbmFtZS5yZXBsYWNlKC9cXC9pbmRleCQvLCBcIlwiKTtcbiAgICAgICAgICAvLyByZXR1cm4gYCR7Y2xlYW5OYW1lfS9pbmRleC5bZm9ybWF0XS5qc2A7XG4gICAgICAgICAgY29uc3QgcmVsYXRpdmVQYXRoID0gZmFjYWRlTW9kdWxlSWRcbiAgICAgICAgICAgID8uc3BsaXQoXCJzcmMvXCIpWzFdXG4gICAgICAgICAgICA/LnJlcGxhY2UoL1xcLnRzKHgpPyQvLCBcIlwiKTtcbiAgICAgICAgICBpZiAoIXJlbGF0aXZlUGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGBbbmFtZV0uW2Zvcm1hdF0uanNgO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVsYXRpdmVQYXRoLmVuZHNXaXRoKFwiL2luZGV4XCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7cmVsYXRpdmVQYXRoLnJlcGxhY2UoL1xcL2luZGV4JC8sIFwiXCIpfS9pbmRleC5bZm9ybWF0XS5qc2A7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBgJHtyZWxhdGl2ZVBhdGh9Lltmb3JtYXRdLmpzYDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2xvYmFsczogeyByZWFjdDogXCJSZWFjdFwiLCBcInJlYWN0LWRvbVwiOiBcIlJlYWN0RG9tXCIgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyVCxPQUFPLGlCQUFpQjtBQUNuVixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUpoQixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixJQUFJLEVBQUUsV0FBVyxPQUFPLFNBQVMsQ0FBQyxvQkFBb0IsZ0JBQWdCLEVBQUUsQ0FBQztBQUFBLElBQ3pFLFlBQVk7QUFBQTtBQUFBLEVBRWQ7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxTQUFTLENBQUMsTUFBTSxLQUFLO0FBQUEsSUFDdkI7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxTQUFTLGFBQWEsT0FBTztBQUFBLE1BQ3hDLFFBQVE7QUFBQSxRQUNOLEtBQUs7QUFBQSxRQUNMLGlCQUFpQjtBQUFBLFFBQ2pCLHFCQUFxQjtBQUFBLFFBQ3JCLGdCQUFnQixDQUFDLEVBQUUsZUFBZSxNQUFNO0FBR3RDLGdCQUFNLGVBQWUsZ0JBQ2pCLE1BQU0sTUFBTSxFQUFFLENBQUMsR0FDZixRQUFRLGFBQWEsRUFBRTtBQUMzQixjQUFJLENBQUMsY0FBYztBQUNqQixtQkFBTztBQUFBLFVBQ1Q7QUFDQSxjQUFJLGFBQWEsU0FBUyxRQUFRLEdBQUc7QUFDbkMsbUJBQU8sR0FBRyxhQUFhLFFBQVEsWUFBWSxFQUFFLENBQUM7QUFBQSxVQUNoRDtBQUNBLGlCQUFPLEdBQUcsWUFBWTtBQUFBLFFBQ3hCO0FBQUEsUUFDQSxTQUFTLEVBQUUsT0FBTyxTQUFTLGFBQWEsV0FBVztBQUFBLE1BQ3JEO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
