export function getPicturesAuthorizationStatus(): number {
    return PHPhotoLibrary.authorizationStatus();
}

export function hasFilePermission(): boolean {
    return this.getPicturesAuthorizationStatus() === PHAuthorizationStatus.Authorized;
}

export function requestFilePermission(): Promise<boolean> {
    return new Promise((resolve) => {
        PHPhotoLibrary.requestAuthorization((status) => resolve(status === PHAuthorizationStatus.Authorized));
    });
}