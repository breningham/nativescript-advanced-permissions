import { requestPermission, hasPermission } from '../core/index.android';

const CALENDAR_PERMISSIONS = [
    (android as any).Manifest.permission.WRITE_CALENDAR,
    (android as any).Manifest.permission.READ_CALENDAR
];

export function requestCalendarPermissions( reason?: string ): Promise<boolean> {
    return requestPermission(CALENDAR_PERMISSIONS,  reason);
}
export function hasCalendarPermissions(): boolean {
    return CALENDAR_PERMISSIONS.map((perm) => hasPermission(perm)).every(Boolean);
}