import { requestPermission, hasPermission } from '../core/index.android';

const CAMERA_PERMISSIONS = (android as any).Manifest.permission.CAMERA;

export function requestCameraPermission() {
    return this.requestPermission( CAMERA_PERMISSIONS );
}

export function hasCameraPermission() {
    return hasPermission( CAMERA_PERMISSIONS );
}