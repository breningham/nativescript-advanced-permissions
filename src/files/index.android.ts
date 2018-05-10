import { requestPermission, hasPermission } from '../core';

const FILE_PERMISSIONS = [
    (android as any).Manifest.permission.WRITE_EXTERNAL_STORAGE,
    (android as any).Manifest.permission.READ_EXTERNAL_STORAGE
];

export function hasFilePermissions(): boolean {
    return FILE_PERMISSIONS
            .map(( permission ) => hasPermission(permission))
            .every(Boolean);
}

export function requestFilePermissions(): Promise<boolean> {
    return requestPermission( FILE_PERMISSIONS )
            .then((args: any) =>  Object.keys(args).map((i) => args[i]).every(Boolean))
            .catch(() => false);
}
