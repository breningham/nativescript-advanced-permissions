import { requestPermission, hasPermission } from '../core';

const CAMERA_PERMISSIONS = [
    android.Manifest.permission.CAMERA
];

export function requestCameraPermissions(reason?: string) {
    return requestPermission( CAMERA_PERMISSIONS );
}

export function hasCameraPermissions() {
    return hasPermission( CAMERA_PERMISSIONS );
}