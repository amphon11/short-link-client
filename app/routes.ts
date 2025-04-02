import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
//   route("stats/:slug", "routes/stats.tsx"), // ✅ เพิ่มเส้นทาง /stats/:slug
  route("stats", "routes/stats.tsx"), // ✅ เพิ่มเส้นทาง /stats/:slug
] satisfies RouteConfig;
