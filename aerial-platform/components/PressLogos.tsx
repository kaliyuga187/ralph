export default function PressLogos() {
  const logos = [
    "TechCrunch",
    "Forbes",
    "WSJ",
    "Bloomberg",
    "Entrepreneur",
    "Inc.",
  ];

  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500 mb-6 uppercase tracking-wide">
          As Seen In
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
