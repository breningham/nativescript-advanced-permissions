import { requestPermission, hasPermission, getContext } from '../core';

export const LOCATION_PERMISSIONS = [
    (android as any).Manifest.permission.ACCESS_FINE_LOCATION,
    (android as any).Manifest.permission.ACCESS_COARSE_LOCATION,
];

export function hasLocationPermissions() {
    return hasPermission( LOCATION_PERMISSIONS );
}

export function requestLocationPermissions( unusedOnAndroid: null, reason?: string ) {
    return requestPermission( LOCATION_PERMISSIONS, reason );
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