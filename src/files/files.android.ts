import { requestPermission, hasPermission } from '../core/index.android';

const FILE_PERMISSIONS = [
    (android as any).Manifest.permission.WRITE_EXTERNAL_STORAGE,
    (android as any).Manifest.permission.READ_EXTERNAL_STORAGE
];

export function hasFilePermission(): boolean {
    return FILE_PERMISSIONS
            .map(( permission ) => hasPermission(permission))
            .every(Boolean);
}

export function requestFilePermission(): Promise<boolean> {
    return requestPermission( FILE_PERMISSIONS )
            .then((args: any) => true,
            (args: any) => false);
}
