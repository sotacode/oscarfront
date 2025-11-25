export interface RoutesAPI {
    origin:                   Destination;
    destination:              Destination;
    travelMode:               string;
    routingPreference:        string;
    computeAlternativeRoutes: boolean;
    routeModifiers:           RouteModifiers;
    languageCode:             string;
    units:                    string;
}

export interface Destination {
    location: Location;
}

export interface Location {
    latLng: LatLng;
}

export interface LatLng {
    latitude:  number;
    longitude: number;
}

export interface RouteModifiers {
    avoidTolls:    boolean;
    avoidHighways: boolean;
    avoidFerries:  boolean;
}
