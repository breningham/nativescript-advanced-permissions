export declare const LOCATION_PERMISSIONS: any[];
export declare function hasLocationPermission(): boolean;
export declare function requestLocationPermission(unusedOnAndroid: null, reason?: string): Promise<any>;
export declare function isLocationEnabled(): boolean;
