export function getPicturesAuthorizationStatus(): number {
    return PHPhotoLibrary.authorizationStatus();
}

export function hasFilePermissions(): boolean {
    return getPicturesAuthorizationStatus() === PHAuthorizationStatus.Authorized;
}

export function requestFilePermissions(): Promise<boolean> {
    return new Promise((resolve) => {
        PHPhotoLibrary.requestAuthorization((status) => resolve(status === PHAuthorizationStatus.Authorized));
    });
}