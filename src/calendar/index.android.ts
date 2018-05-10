import { requestPermission, hasPermission } from '../core';

const CALENDAR_PERMISSIONS = [
    (android as any).Manifest.permission.WRITE_CALENDAR,
    (android as any).Manifest.permission.READ_CALENDAR
];

export function requestCalendarPermissions( reason?: string ): Promise<boolean> {
    return requestPermission(CALENDAR_PERMISSIONS,  reason)
        .then((args: any) =>  Object.keys(args).map((i) => args[i]).every(Boolean))
        .catch(() => false);
}
export function hasCalendarPermissions(): boolean {
    return CALENDAR_PERMISSIONS.map((perm) => hasPermission(perm)).every(Boolean);
}