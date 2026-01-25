"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapboxMapProps {
  center?: [number, number]; // [lng, lat]
  zoom?: number;
  className?: string;
  onMapLoad?: (map: mapboxgl.Map) => void;
}

export default function MapboxMap({
  center = [-97.7431, 30.2672], // Austin, TX default
  zoom = 15,
  className = "w-full h-96",
  onMapLoad,
}: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) return; // Initialize map only once

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (!token || token === "placeholder-mapbox-token") {
      setError(
        "Mapbox token not configured. Add NEXT_PUBLIC_MAPBOX_TOKEN to .env.local"
      );
      return;
    }

    mapboxgl.accessToken = token;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/satellite-streets-v12", // Aerial imagery
        center: center,
        zoom: zoom,
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      // Add scale control
      map.current.addControl(
        new mapboxgl.ScaleControl({ unit: "imperial" }),
        "bottom-left"
      );

      // Call onMapLoad when map is ready
      map.current.on("load", () => {
        if (map.current && onMapLoad) {
          onMapLoad(map.current);
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load map");
      console.error("Mapbox error:", err);
    }

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [center, zoom, onMapLoad]);

  if (error) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg`}
      >
        <div className="text-center p-6">
          <div className="text-4xl mb-2">🗺️</div>
          <p className="text-gray-700 font-semibold mb-1">Map Unavailable</p>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return <div ref={mapContainer} className={className} />;
}
