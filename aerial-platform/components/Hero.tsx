"use client";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-brand-600 to-brand-800 text-white">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Get 5 Local Bids in 24 Hours
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-brand-100">
            Connect with verified contractors in your area using AI-powered aerial imagery
          </p>

          {/* Dual-path CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="w-full sm:w-auto bg-white text-brand-700 px-8 py-4 rounded-lg text-lg font-bold hover:bg-brand-50 transition-all transform hover:scale-105 shadow-xl">
              I Need Work Done
            </button>
            <button className="w-full sm:w-auto bg-success-500 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-success-600 transition-all transform hover:scale-105 shadow-xl">
              I'm a Contractor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
