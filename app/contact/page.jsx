function ContactPage() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <span className="text-sm font-semibold text-(--primary)">Support</span>

        <h1 className="mt-2 text-3xl font-bold text-gray-950">Contact Us</h1>

        <p className="mt-4 leading-7 text-gray-600">Need help with your order or have a question about NextShop? Our support team is here to help.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <a href="https://wa.me/201204995735" target="_blank" rel="noreferrer" className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
            <i className="fa-brands fa-whatsapp text-2xl text-(--primary)"></i>
            <h2 className="mt-4 font-bold text-gray-950">Phone</h2>
            <p className="mt-2 text-sm text-gray-500">
              <span>
                01204995735
              </span>
            </p>
          </a>

          <a href="mailto:petersalah104@gmail.com" className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
            <i className="fas fa-envelope text-xl text-(--primary)"></i>
            <h2 className="mt-4 font-bold text-gray-950">Email</h2>
            <p className="mt-2 text-sm text-gray-500">petersalah104@gmail.com</p>
          </a>

          <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
            <i className="fas fa-location-dot text-xl text-(--primary)"></i>
            <h2 className="mt-4 font-bold text-gray-950">Address</h2>
            <p className="mt-2 text-sm text-gray-500">Assiut, Egypt</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
