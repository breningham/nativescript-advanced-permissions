export declare enum RequestType {
    WHEN_IN_USE,
    ALWAYS,
}
export declare function hasLocationPermissions(): boolean;
export declare function requestLocationPermission(type?: RequestType): Promise<boolean>;
export declare function isLocationEnabled(): boolean;
