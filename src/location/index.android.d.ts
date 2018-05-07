export declare enum LocationType {
    FINE,
    COARSE,
}
export declare function hasLocationPermission(type: LocationType): boolean;
export declare function requestLocationPermission(type: LocationType, reason?: string): Promise<any>;
export declare function isLocationEnabled(): boolean;
