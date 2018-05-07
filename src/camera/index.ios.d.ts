export declare function isCameraPresent(): boolean;
export declare function isFrontCameraPresent(): boolean;
export declare function isRearCameraPresent(): boolean;
export declare function getCameraAuthorizationStatus(): number;
export declare function isCameraAuthorized(): boolean;
export declare function hasCameraPermission(): boolean;
export declare function requestCameraPermission(): Promise<boolean>;
