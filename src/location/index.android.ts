import { requestPermission, hasPermission, getContext } from '../core/index.android';

export enum LocationType {
    FINE = (android as any).Manifest.permission.ACCESS_FINE_LOCATION,
    COARSE = (android as any).Manifest.permission.ACCESS_COARSE_LOCATION,
}

export function hasLocationPermission( type: LocationType ) {
    return hasPermission( type );
}

export function requestLocationPermission( type: LocationType , reason?: string ) {
    return requestPermission( type, reason );
}

export function isLocationEnabled() {
    let gps_enabled = false,
        network_enabled = false;

    const context = getContext();
    const locationManager: android.location.LocationManager = context.getSystemService(android.content.Context.LOCATION_SERVICE);

    gps_enabled = locationManager.isProviderEnabled( android.location.LocationManager.GPS_PROVIDER );
    network_enabled = locationManager.isProviderEnabled( android.location.LocationManager.NETWORK_PROVIDER );

    return gps_enabled && network_enabled;
}