"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    google: typeof google;
  }
}

interface PlaceAutocompleteWidgetProps {
  onPlaceSelected?: (place: google.maps.places.PlaceResult) => void;
}

export default function GettingAddress({
  onPlaceSelected,
}: PlaceAutocompleteWidgetProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!window.google || !inputRef.current || !mapRef.current) {
      return;
    }

    const auckland = { lat: -36.8485, lng: 174.7633 };

    // Create the map
    const map = new google.maps.Map(mapRef.current, {
      center: auckland,
      zoom: 13,
      mapTypeControl: false,
    });

    // Create the autocomplete widget
    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "nz" },
      fields: ["geometry", "name", "formatted_address"],
    });
    autocompleteRef.current = autocomplete;

    // Create marker + info window
    const marker = new google.maps.Marker({
      map,
      visible: false,
    });
    markerRef.current = marker;

    const infoWindow = new google.maps.InfoWindow();
    infoWindowRef.current = infoWindow;

    // Listen for when user selects a place from the Google dropdown
    autocomplete.addListener("place_changed", () => {
      infoWindow.close();
      marker.setVisible(false);

      const place = autocomplete.getPlace();
      console.log(place)
      if (!place.geometry || !place.geometry.location) {
        // The user entered something that was not recognized
        alert(`No details available for input: '${place.name}'`);
        return;
      }

      // If the place has a viewport, use it; otherwise center and zoom
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      infoWindow.setContent(`
        <div>
          <strong>${place.name}</strong><br />
          ${place.formatted_address}
        </div>
      `);
      infoWindow.open(map, marker);

      // Callback
      if (onPlaceSelected) {
        onPlaceSelected(place);
      }
    });

    // cleanup (optional)
    return () => {
      // remove listener etc.
    };
  }, [onPlaceSelected]);

  return (
    <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter an address in Auckland..."
        className="border border-gray-300 rounded-lg p-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div
        ref={mapRef}
        className="w-full h-80 rounded-lg border border-gray-300"
        style={{ backgroundColor: '#f0f0f0', color: '#888', textAlign: 'center', lineHeight: '320px' }}
      ></div>
    </div>
  );
}
