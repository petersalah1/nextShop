'use client';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-gray-900 pt-12 pb-6 text-gray-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:grid-cols-6">
        {/* Logo & About */}
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="mb-4 flex items-center gap-2">
            <img
              src="/logo.png"
              alt="NextShop Logo"
              className="h-10 rounded-lg bg-white px-2"
            />
          </Link>

          <p className="mb-4 leading-7 text-gray-400">
            NextShop is your one-stop destination for quality products. From
            fashion to electronics, we bring you the best brands at competitive
            prices.
          </p>

          <div className="space-y-2 text-gray-400">
            <p className="flex items-center gap-2">
              <i className="fa-brands fa-whatsapp w-5 text-lg text-(--primary)"></i>
              <a
                href="https://wa.me/201204995735"
                target="_blank"
                rel="noreferrer"
              >
                01204995735
              </a>
            </p>

            <p className="flex items-center gap-2">
              <i className="fas fa-envelope w-5 text-(--primary)"></i>
              <a href="mailto:petersalah104@gmail.com">petersalah104@gmail.com</a>
            </p>

            <p className="flex items-center gap-2">
              <i className="fas fa-map-marker-alt w-5 text-(--primary)"></i>
              Assiut, Egypt
            </p>
          </div>

          <div className="mt-4 flex gap-3">
            <a
              href="https://github.com/petersalah1"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 transition hover:text-(--primary)"
            >
              <i className="fab fa-github"></i>
            </a>

            <a
              href="https://www.linkedin.com/in/petersalah/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 transition hover:text-(--primary)"
            >
              <i className="fab fa-linkedin"></i>
            </a>

            <a
              href="https://www.facebook.com/peter.salah.311/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 transition hover:text-(--primary)"
            >
              <i className="fab fa-facebook-f"></i>
            </a>

            <a
              href="https://www.instagram.com/petersalah.2004/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 transition hover:text-(--primary)"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="mb-3 font-semibold text-white">Shop</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link href="/products" className="hover:text-(--primary)">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-(--primary)">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/brands" className="hover:text-(--primary)">
                Brands
              </Link>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="mb-3 font-semibold text-white">Account</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link href="/login" className="hover:text-(--primary)">
                Sign In
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-(--primary)">
                Create Account
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="hover:text-(--primary)">
                Wishlist
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-(--primary)">
                Shopping Cart
              </Link>
            </li>
            <li>
              <Link href="/allorders" className="hover:text-(--primary)">
                Orders
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="mb-3 font-semibold text-white">Support</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link href="/contact" className="hover:text-(--primary)">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/help-center" className="hover:text-(--primary)">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/shipping-info" className="hover:text-(--primary)">
                Shipping Info
              </Link>
            </li>
            <li>
              <Link href="/returns-refunds" className="hover:text-(--primary)">
                Returns & Refunds
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="mb-3 font-semibold text-white">Legal</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link href="/privacy-policy" className="hover:text-(--primary)">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="hover:text-(--primary)">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl flex-col justify-between border-t border-gray-700 px-4 pt-4 text-sm text-gray-400 sm:flex-row">
        <p>© 2026 NextShop. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;