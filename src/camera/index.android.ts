import { requestPermission, hasPermission } from '../core';

const CAMERA_PERMISSIONS = (android as any).Manifest.permission.CAMERA;

export function requestCameraPermissions(reason?: string) {
    return requestPermission( CAMERA_PERMISSIONS );
}

export function hasCameraPermissions() {
    return hasPermission( CAMERA_PERMISSIONS )
        .then((args: any) =>  Object.keys(args).map((i) => args[i]).every(Boolean))
        .catch(() => false);
}