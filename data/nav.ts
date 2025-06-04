import { NavLink, RadioStation } from "../types/nav";

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/products", label: "products" },
  { href: "/favorites", label: "favorites" },
  { href: "/reviews", label: "reviews" },
  { href: "/cart", label: "cart (stash)" },
  { href: "/orders", label: "orders (purchases)" },
  { href: "/admin/sales", label: "admin dashboard" },
];

export const ADMIN_LINKS: NavLink[] = [
  { href: "/admin/sales", label: "sales" },
  { href: "/admin/products", label: "products" },
  { href: "/admin/products/create", label: "create product" },
];

export const RADIO_STATIONS: RadioStation[] = [
  {
    id: "galaxy_news",
    label: "Galaxy News Radio",
    url: "https://open.spotify.com/playlist/5x16Hyl2NRxonkdEig7IK7",
  },
  {
    id: "new_vegas",
    label: "New Vegas Strip Radio",
    url: "https://open.spotify.com/playlist/3B8CHkHSu7rpb8VD2g9mn0",
  },
  {
    id: "wasteland_radio",
    label: "Radio Free Wasteland",
    url: "https://open.spotify.com/playlist/4nJl9RSxE1s3krm9jS9k8R",
  },
  {
    id: "enclave",
    label: "Enclave Propaganda Radio",
    url: "https://open.spotify.com/playlist/0wtSLtPJrrVF57mynxT8Zs",
  },
];
