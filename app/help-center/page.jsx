function HelpCenterPage() {
  const questions = [
    {
      question: 'How can I place an order?',
      answer:
        'Browse products, add items to your cart, then go to checkout and choose cash or online payment.',
    },
    {
      question: 'Can I pay online?',
      answer:
        'Yes, NextShop supports online payment through a secure Stripe checkout page.',
    },
    {
      question: 'Where can I see my orders?',
      answer:
        'After logging in, you can view your order history from the Orders page.',
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <span className="text-sm font-semibold text-(--primary)">Support</span>

        <h1 className="mt-2 text-3xl font-bold text-gray-950">Help Center</h1>

        <p className="mt-4 leading-7 text-gray-600">
          Find quick answers to common questions about shopping on NextShop.
        </p>

        <div className="mt-8 space-y-4">
          {questions.map((item) => (
            <div
              key={item.question}
              className="rounded-3xl border border-gray-100 bg-gray-50 p-5"
            >
              <h2 className="font-bold text-gray-950">{item.question}</h2>
              <p className="mt-2 leading-7 text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HelpCenterPage;