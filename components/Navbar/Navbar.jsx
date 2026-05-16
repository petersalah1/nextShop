'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/categories', label: 'Categories' },
  { href: '/brands', label: 'Brands' },
];

const actionLinks = [
  { href: '/wishlist', label: 'Wishlist', icon: 'fa-regular fa-heart' },
  { href: '/cart', label: 'Cart', icon: 'fa-solid fa-cart-shopping' },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const { cartCount } = useCart();

  const isActive = (href) => {
    return pathname === href || (href !== '/' && pathname.startsWith(href));
  };

  const closeMenu = () => setOpen(false);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" onClick={closeMenu} className="flex items-center gap-2">
          <img src="/logo.png" alt="NextShop Logo" className="h-10" />
        </Link>

        <ul className="hidden items-center gap-2 font-medium lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={`rounded-full px-4 py-2 text-sm transition ${isActive(link.href) ? 'bg-blue-50 text-(--primary)' : 'text-gray-700 hover:bg-blue-50 hover:text-(--primary)'}`}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <input type="text" placeholder="Search..." className="w-44 rounded-full border border-gray-200 px-4 py-2 text-sm outline-none transition focus:border-blue-600 xl:w-60" />

          <div className="flex items-center gap-3">
            {actionLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex h-10 w-10 items-center justify-center rounded-full transition ${isActive(link.href) ? 'bg-(--primary) text-white' : 'bg-blue-50 text-(--primary) hover:bg-blue-100'}`}
                aria-label={link.label}>
                <i className={link.icon}></i>

                {link.href === '/cart' && cartCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-(--primary) px-1 text-xs font-bold text-white">{cartCount}</span>}
              </Link>
            ))}
          </div>

          <Link href="/login" className="rounded-full bg-(--primary) px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
            Login
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {actionLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`relative flex h-10 w-10 items-center justify-center rounded-full transition ${isActive(link.href) ? 'bg-(--primary) text-white' : 'bg-blue-50 text-(--primary) hover:bg-blue-100'}`}
              aria-label={link.label}>
              <i className={link.icon}></i>

              {link.href === '/cart' && cartCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-(--primary) px-1 text-xs font-bold text-white">{cartCount}</span>}
            </Link>
          ))}

          <button onClick={() => setOpen(!open)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition hover:bg-gray-50" aria-label="Open menu">
            <i className={open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-gray-100 bg-white px-4 py-5 shadow-md lg:hidden">
          <input type="text" placeholder="Search..." className="mb-5 w-full rounded-full border border-gray-200 px-4 py-2 text-sm outline-none transition focus:border-blue-600" />

          <ul className="space-y-2 font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={closeMenu} className={`block rounded-xl px-4 py-3 transition ${isActive(link.href) ? 'bg-blue-50 text-(--primary)' : 'text-gray-700 hover:bg-blue-50 hover:text-(--primary)'}`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-5 border-t border-gray-100 pt-5">
            <Link href="/login" onClick={closeMenu} className="block rounded-xl bg-(--primary) px-4 py-3 text-center font-medium text-white transition hover:bg-blue-700">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
