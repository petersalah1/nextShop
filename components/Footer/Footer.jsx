import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <img src="/logo.png" alt="NextShop Logo" className="h-10 bg-white rounded-lg px-2" />
          </Link>
          <p className="text-gray-400 mb-4">NextShop is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices.</p>
          <div className="space-y-2 text-gray-400">
            <p className="flex items-center gap-2">
              <i className="fas fa-phone-alt text-(--primary) w-5"></i>
              01204995735
            </p>
            <p className="flex items-center gap-2">
              <i className="fas fa-envelope text-(--primary) w-5"></i>
              support@nextshop.com
            </p>
            <p className="flex items-center gap-2">
              <i className="fas fa-map-marker-alt text-(--primary) w-5"></i>
              123 Commerce Street, New York
            </p>
          </div>
          <div className="flex gap-3 mt-4">
            <a href="#" className="text-gray-400 hover:text-(--primary)">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-(--primary)">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-(--primary)">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-(--primary)">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        {/* Columns */}
        <div>
          <h3 className="text-white font-semibold mb-3">Shop</h3>
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
            <li>
              <Link href="#" className="hover:text-(--primary)">
                Electronics
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-(--primary)">
                Men's Fashion
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-(--primary)">
                Women's Fashion
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Account</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link href="#" className="hover:text-(--primary)">
                My Account
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-(--primary)">
                Order History
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
              <Link href="/login" className="hover:text-(--primary)">
                Sign In
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-(--primary)">
                Create Account
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link href="#" className="hover:text-(--primary)">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-(--primary)">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-(--primary)">
                Shipping Info
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-(--primary)">
                Returns & Refunds
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-(--primary)">
                Track Order
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link href="#" className="hover:text-(--primary)">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-(--primary)">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-(--primary)">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-gray-400 text-sm flex flex-col sm:flex-row justify-between max-w-7xl mx-auto px-4">
        <p>© 2026 NextShop. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
