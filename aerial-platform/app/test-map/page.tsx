import MapboxMap from "@/components/MapboxMap";

export default function TestMapPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Mapbox Integration Test</h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Aerial Imagery View (Austin, TX)
          </h2>
          <MapboxMap className="w-full h-96 rounded-lg" />
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            ✅ <strong>US-009 Complete:</strong> Mapbox aerial imagery integration
            working. Satellite view with navigation controls.
          </p>
        </div>
      </div>
    </main>
  );
}
