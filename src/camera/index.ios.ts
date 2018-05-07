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
    return this.getCameraAuthorizationStatus() === AVAuthorizationStatus.Authorized;
}

export function hasCameraPermission(): boolean {
    return this.isCameraPresent() && this.isCameraAuthorized();
}

export function requestCameraPermission(): Promise<boolean> {
    return new Promise((resolve) => {
        AVCaptureDevice.requestAccessForMediaTypeCompletionHandler(AVMediaTypeVideo, resolve);
    });
}