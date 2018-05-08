export declare const RequestType: {
    WHEN_IN_USE: string;
    ALWAYS: string;
};
export declare function hasLocationPermissions(): boolean;
export declare function requestLocationPermissions(always?: boolean): Promise<boolean>;
export declare function isLocationEnabled(): boolean;
