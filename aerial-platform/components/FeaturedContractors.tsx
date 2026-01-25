const contractors = [
  {
    name: "Elite Roofing Co.",
    rating: 4.9,
    jobs: 120,
    photo: "https://i.pravatar.cc/150?img=60",
    specialty: "Roofing",
    location: "Austin, TX",
  },
  {
    name: "GreenScape Design",
    rating: 5.0,
    jobs: 89,
    photo: "https://i.pravatar.cc/150?img=14",
    specialty: "Landscaping",
    location: "Portland, OR",
  },
  {
    name: "SolarTech Pro",
    rating: 4.8,
    jobs: 156,
    photo: "https://i.pravatar.cc/150?img=68",
    specialty: "Solar",
    location: "Denver, CO",
  },
  {
    name: "Modern Renovations",
    rating: 4.9,
    jobs: 95,
    photo: "https://i.pravatar.cc/150?img=51",
    specialty: "General",
    location: "Brooklyn, NY",
  },
];

export default function FeaturedContractors() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">
          Featured Top-Rated Contractors
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Join the pros earning an average of $12,000/month on our platform
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contractors.map((contractor, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={contractor.photo}
                  alt={contractor.name}
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <h3 className="font-semibold text-lg mb-1">
                  {contractor.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {contractor.specialty} • {contractor.location}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    <svg
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold">
                    {contractor.rating}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {contractor.jobs}+ jobs completed
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
