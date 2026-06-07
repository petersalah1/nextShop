function TermsOfServicePage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <span className="text-sm font-semibold text-(--primary)">Legal</span>

        <h1 className="mt-2 text-3xl font-bold text-gray-950">
          Terms of Service
        </h1>

        <div className="mt-6 space-y-5 leading-7 text-gray-600">
          <p>
            By using NextShop, users agree to use the website responsibly and
            provide accurate account, shipping, and order information.
          </p>

          <p>
            Product availability, pricing, shipping, and payment options may
            vary depending on the backend API response.
          </p>

          <p>
            This project is built as an ecommerce web application and may be
            improved over time with additional features and policies.
          </p>
        </div>
      </div>
    </section>
  );
}

export default TermsOfServicePage;