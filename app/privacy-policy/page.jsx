function PrivacyPolicyPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <span className="text-sm font-semibold text-(--primary)">Legal</span>

        <h1 className="mt-2 text-3xl font-bold text-gray-950">
          Privacy Policy
        </h1>

        <div className="mt-6 space-y-5 leading-7 text-gray-600">
          <p>
            NextShop respects user privacy and handles personal information
            responsibly. This page explains how user data may be used within the
            application.
          </p>

          <p>
            Account data, cart items, wishlist items, and order information are
            used only to provide the shopping experience.
          </p>

          <p>
            Payment information is handled through secure external payment
            providers. NextShop does not store card details directly.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PrivacyPolicyPage;