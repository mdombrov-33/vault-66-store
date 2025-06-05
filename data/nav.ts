import { NavLink } from "../types/nav";

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/products", label: "products" },
  { href: "/favorites", label: "favorites" },
  { href: "/reviews", label: "reviews" },
  { href: "/cart", label: "cart (stash)" },
  { href: "/orders", label: "orders (purchases)" },
  { href: "/profile/special", label: "profile" },
  { href: "/admin/sales", label: "admin dashboard" },
];

export const ADMIN_LINKS: NavLink[] = [
  { href: "/admin/sales", label: "sales" },
  { href: "/admin/products", label: "products" },
  { href: "/admin/products/create", label: "create product" },
];

export const PROFILE_LINKS: NavLink[] = [
  { href: "/profile/special", label: "special" },
  { href: "/profile/goat", label: "g.o.a.t." },
  { href: "/profile/map", label: "map" },
  { href: "/profile/hack", label: "hack" },
];
