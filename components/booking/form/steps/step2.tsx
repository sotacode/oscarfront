"use client";

import { Input } from "@nextui-org/input";
import { use, useEffect, useRef, useState } from "react";
import { importLibrary } from "@googlemaps/js-api-loader";
import { useFormContext } from "react-hook-form";
import { set } from "zod";
import { tr } from "zod/v4/locales";

export default function Step2() {
    const { setValue, register, formState: { errors }, getValues, trigger } = useFormContext();
    const mapRef = useRef<HTMLDivElement | null>(null);
    const autocompleteRef = useRef<any>(null);
    const markerRef = useRef<any>(null);
    const inputElRef = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [addressFormattedData, setAddressFormattedData] = useState<string>("");
    const [placeId, setPlaceId] = useState<string>("");
    const [lat, setLat] = useState<number | null>(null);
    const [lng, setLng] = useState<number | null>(null);
    const [postcode, setPostcode] = useState<string>("");

    useEffect(() => {


        let gmpMapEl: HTMLElement | null = null;
        let mapInstance: google.maps.Map | null = null;
        let gmpAutocomplete: google.maps.places.Autocomplete | null = null;

        const loadMaps = async () => {
            await importLibrary("maps");
            await importLibrary("places");
            await importLibrary("marker");

            if (!mapRef.current) return;
            mapRef.current.innerHTML = "";

            gmpMapEl = document.createElement("div");
            gmpMapEl.style.width = "100%";
            gmpMapEl.style.height = "320px";
            gmpMapEl.style.borderRadius = "0.5rem";
            gmpMapEl.style.border = "1px solid #d1d5db";

            const auckland = { lat: -36.8485, lng: 174.7633 };
            mapInstance = new google.maps.Map(gmpMapEl, {
                center: auckland,
                zoom: 13,
                mapTypeControl: false,
                mapId: "ChIJuZqpSPtHDW0R4LOiQ2HvAAU",
            });

            mapRef.current.appendChild(gmpMapEl);

            if (inputElRef.current) {
                gmpAutocomplete = new window.google.maps.places.Autocomplete(
                    inputElRef.current,
                    {
                        types: ["address"],
                        componentRestrictions: { country: "nz" },
                        fields: [
                            "formatted_address",
                            "geometry",
                            "name",
                            "place_id",
                            "geometry.location", // This ensures lat/lng is included
                            "address_components",
                        ],
                        bounds: new window.google.maps.LatLngBounds(
                            { lat: -37.0, lng: 174.6 },
                            { lat: -36.7, lng: 175.0 }
                        ),
                        strictBounds: false,
                    }
                );
                autocompleteRef.current = gmpAutocomplete;

                gmpAutocomplete.addListener("place_changed", () => {
                    if (!gmpAutocomplete) return;
                    const place = gmpAutocomplete.getPlace();
                    setInputValue(place.formatted_address || "");
                    if (mapInstance && place.geometry && place.geometry.location) {
                        if (place.geometry.viewport) {
                            mapInstance.fitBounds(place.geometry.viewport);
                        } else {
                            mapInstance.setCenter(place.geometry.location);
                            mapInstance.setZoom(17);
                        }
                    }
                    setAddressFormattedData(place.formatted_address || "");
                    setPlaceId(place.place_id || "");

                    // Extract postcode
                    let extractedPostcode = "";
                    if (place.address_components) {
                        for (const component of place.address_components) {
                            if (component.types.includes("postal_code")) {
                                extractedPostcode = component.long_name;
                                break;
                            }
                        }
                    }
                    setPostcode(extractedPostcode);

                    console.log("Selected place:", place);
                    console.log("Formatted Address:", place.formatted_address);
                    console.log("Place ID:", place.place_id);
                    console.log("Postcode:", extractedPostcode);
                    // Add marker
                    importLibrary("marker").then(({ AdvancedMarkerElement }) => {
                        if (mapInstance && place.geometry && place.geometry.location) {
                            if (markerRef.current) {
                                markerRef.current.map = null;
                            }
                            markerRef.current = new AdvancedMarkerElement({
                                position: place.geometry.location,
                                map: mapInstance,
                                title: place.name,
                            });
                            mapInstance.panTo(place.geometry.location);
                            console.log("Marker placed at:", place.geometry.location.toJSON());
                            setLat(place.geometry.location.lat());
                            setLng(place.geometry.location.lng());
                        }
                    });
                });
            }
        };

        loadMaps();
        return () => {
            if (mapRef.current) mapRef.current.innerHTML = "";
        };
    }, [setValue]);

    useEffect(() => {
        // Update form values when address changes
        setValue("formatted_address", addressFormattedData);
        setValue("place_id", placeId);
        setValue("address", inputValue);
        setValue("lat", lat ? lat.toString() : "");
        setValue("lng", lng ? lng.toString() : "");
        setValue("postcode", postcode);
        // Trigger validation
        trigger("formatted_address");
        trigger("place_id");
        trigger("address");
        trigger("lat");
        trigger("lng");
        trigger("postcode");
    }, [addressFormattedData, placeId, lat, lng, postcode]);


    return (
        <div className="w-full">
            <Input
                ref={el => {
                    inputElRef.current = el;
                }}
                value={inputValue}
                onChange={e => {
                    setInputValue(e.target.value);
                }}
                label="Address"
                placeholder="Enter an address in Auckland..."
                className="mb-4"
                isInvalid={!!errors.address}
                errorMessage={errors.address?.message?.toString()}
            />
            {errors.postcode && (
                <div className="text-danger text-sm mb-4">
                    {errors.postcode.message?.toString()}
                </div>
            )}
            <Input
                label="formatted_address"
                {...register("formatted_address")}
                isInvalid={!!errors.formatted_address}
                errorMessage={errors.formatted_address?.message?.toString()}
                className="hidden"
                value={addressFormattedData}
            />
            <Input
                label="place_id"
                {...register("place_id")}
                isInvalid={!!errors.place_id}
                errorMessage={errors.place_id?.message?.toString()}
                className="hidden"
                value={placeId}
            />
            <Input
                label="lng"
                {...register("lng")}
                isInvalid={!!errors.lng}
                errorMessage={errors.lng?.message?.toString()}
                className="hidden"
                value={placeId}
            />
            <Input
                label="lat"
                {...register("lat")}
                isInvalid={!!errors.lat}
                errorMessage={errors.lat?.message?.toString()}
                className="hidden"
                value={placeId}
            />
            <Input
                label="postcode"
                {...register("postcode")}
                isInvalid={!!errors.postcode}
                errorMessage={errors.postcode?.message?.toString()}
                className="hidden"
                value={postcode}
            />
            <div ref={mapRef} className="w-full h-80 rounded-lg mb-8" />
        </div>
    );
}

