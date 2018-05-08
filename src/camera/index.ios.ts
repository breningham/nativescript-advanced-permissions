export function isCameraPresent(): boolean {
    return UIImagePickerController.isSourceTypeAvailable(UIImagePickerControllerSourceType.Camera);
}

export function isFrontCameraPresent(): boolean {
    return UIImagePickerController.isCameraDeviceAvailable(UIImagePickerControllerCameraDevice.Front);
}

export function isRearCameraPresent(): boolean {
    return UIImagePickerController.isCameraDeviceAvailable(UIImagePickerControllerCameraDevice.Rear);
}

export function getCameraAuthorizationStatus(): number {
    return AVCaptureDevice.authorizationStatusForMediaType(AVMediaTypeVideo);
}

export function isCameraAuthorized(): boolean {
    return getCameraAuthorizationStatus() === AVAuthorizationStatus.Authorized;
}

export function hasCameraPermissions(): boolean {
    return isCameraPresent() && isCameraAuthorized();
}

export function requestCameraPermissions(): Promise<boolean> {
    return new Promise((resolve) => {
        AVCaptureDevice.requestAccessForMediaTypeCompletionHandler(AVMediaTypeVideo, resolve);
    });
}