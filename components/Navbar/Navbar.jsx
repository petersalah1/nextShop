'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCartQuery } from '@/hooks/queries/useCart';
import { useWishlistQuery } from '@/hooks/queries/useWishlist';

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
  const router = useRouter();

  const { user, isAuthenticated, logout } = useAuth();
  const { data: cartResponse } = useCartQuery();
  const { data: wishlistResponse } = useWishlistQuery();

  const cartCount = isAuthenticated ? cartResponse?.numOfCartItems || 0 : 0;
  const wishlistCount = isAuthenticated ? wishlistResponse?.data?.length || 0 : 0;

  const userName = user?.name || 'Account';
  const userFirstName = userName.split(' ')[0];
  const userInitial = userName.charAt(0).toUpperCase();

  const isActive = (href) => {
    return pathname === href || (href !== '/' && pathname.startsWith(href));
  };

  const closeMenu = () => setOpen(false);

  function handleLogout() {
    logout();
    closeMenu();
    router.push('/login');
  }

  function getActionCount(href) {
    if (href === '/cart') {
      return cartCount;
    }

    if (href === '/wishlist') {
      return wishlistCount;
    }

    return 0;
  }

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" onClick={closeMenu} className="flex items-center gap-2">
          <img src="/logo.png" alt="NextShop Logo" className="h-10" />
        </Link>

        <ul className="hidden items-center gap-2 font-medium lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  isActive(link.href)
                    ? 'bg-blue-50 text-(--primary)'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-(--primary)'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center gap-3">
            {actionLinks.map((link) => {
              const actionCount = getActionCount(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex h-10 w-10 items-center justify-center rounded-full transition ${
                    isActive(link.href)
                      ? 'bg-(--primary) text-white'
                      : 'bg-blue-50 text-(--primary) hover:bg-blue-100'
                  }`}
                  aria-label={link.label}
                >
                  <i className={link.icon}></i>

                  {actionCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-(--primary) px-1 text-xs font-bold text-white">
                      {actionCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 py-1 pl-1 pr-2">
              <div className="flex items-center gap-2 pr-1">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-(--primary) text-sm font-bold text-white">
                  {userInitial}
                </span>

                <span className="max-w-24 truncate text-sm font-semibold text-gray-700">
                  {userFirstName}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-red-50 hover:text-red-600 hover:cursor-pointer"
                aria-label="Logout"
                title="Logout"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-(--primary) px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {actionLinks.map((link) => {
            const actionCount = getActionCount(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`relative flex h-10 w-10 items-center justify-center rounded-full transition ${
                  isActive(link.href)
                    ? 'bg-(--primary) text-white'
                    : 'bg-blue-50 text-(--primary) hover:bg-blue-100'
                }`}
                aria-label={link.label}
              >
                <i className={link.icon}></i>

                {actionCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-(--primary) px-1 text-xs font-bold text-white">
                    {actionCount}
                  </span>
                )}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition hover:bg-gray-50"
            aria-label="Open menu"
          >
            <i className={open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
          </button>
        </div>
      </div>

      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeMenu}
          className="fixed inset-0 top-16 z-40 bg-black/20 lg:hidden"
        />
      )}

      {open && (
        <div className="relative z-50 border-t border-gray-100 bg-white px-4 py-5 shadow-md lg:hidden">
          <ul className="space-y-2 font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className={`block rounded-xl px-4 py-3 transition ${
                    isActive(link.href)
                      ? 'bg-blue-50 text-(--primary)'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-(--primary)'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-5 border-t border-gray-100 pt-5">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 rounded-2xl bg-gray-50 px-4 py-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-(--primary) text-sm font-bold text-white">
                    {userInitial}
                  </span>

                  <span className="text-sm font-semibold text-gray-700">
                    {userName}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full rounded-xl border border-gray-200 px-4 py-3 text-center font-medium text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={closeMenu}
                className="block rounded-xl bg-(--primary) px-4 py-3 text-center font-medium text-white transition hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
