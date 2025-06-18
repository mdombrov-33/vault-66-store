import { NavLink } from '../types/nav'

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
  { href: '/items', label: 'items' },
  { href: '/favorites', label: 'favorites' },
  { href: '/reviews', label: 'reviews' },
  { href: '/supply-bin', label: 'supply bin' },
  { href: '/supply-history', label: 'supply history' },
  { href: '/profile/special', label: 'profile' },
  { href: '/admin/sales', label: 'admin panel' },
]

export const ADMIN_LINKS: NavLink[] = [
  { href: '/admin/sales', label: 'sales' },
  { href: '/admin/items', label: 'items' },
  { href: '/admin/items/create', label: 'create item' },
]

export const PROFILE_LINKS: NavLink[] = [
  { href: '/profile/special', label: 'SPECIAL' },
  { href: '/profile/goat', label: 'g.o.a.t.' },
  { href: '/profile/hack', label: 'hack' },
  { href: '/profile/lockpick', label: 'lockpick' },
  { href: '/profile/vault-log', label: 'vault log' },
]
