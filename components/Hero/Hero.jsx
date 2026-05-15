
import Link from 'next/link';


function Hero() {

  return (
    <>
      <main className="min-h-screen bg-white">
        <section
          className="relative min-h-screen overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero.jpg')",
          }}>
          <div className="absolute inset-0 bg-linear-to-r from-gray-950/85 via-gray-950/55 to-gray-950/15" />
          <div className="absolute inset-0 bg-linear-to-t from-gray-950/60 via-transparent to-transparent" />

          <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">Discover products that match your style.</h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-gray-200 sm:text-lg">Explore electronics, fashion, home essentials, and more with a smooth shopping experience, fast delivery, and secure checkout.</p>

              <div className="mt-6 flex flex-wrap items-center gap-2 sm:mt-8 sm:gap-3">
                <Link href="/products" className="rounded-full bg-(--primary) px-6 py-2.5 text-center text-sm font-semibold text-white shadow-lg transition hover:bg-white hover:text-(--primary) sm:px-8 sm:py-3">
                  Start Shopping
                </Link>

                <Link href="/categories" className="rounded-full border border-white/25 bg-white/10 px-6 py-2.5 text-center text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-gray-950 sm:px-8 sm:py-3">
                  Browse Categories
                </Link>
              </div>


            </div>

            {/* Floating Offer Card */}
            <div className="absolute bottom-6 left-4 right-4 rounded-3xl border border-white/15 bg-white/10 p-4 text-white shadow-2xl backdrop-blur-md sm:left-auto sm:right-8 sm:w-[360px] lg:bottom-10">
              <p className="text-sm font-medium text-gray-200">Limited Offer</p>

              <div className="mt-2 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Up to 40% OFF</h2>
                  <p className="mt-1 text-sm text-gray-300">Selected products this week.</p>
                </div>

                <Link href="/products" className="shrink-0 rounded-full bg-white px-5 py-3 text-sm font-bold text-gray-950 transition hover:bg-(--primary) hover:text-white">
                  Shop
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Hero;
