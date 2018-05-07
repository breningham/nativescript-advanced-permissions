export { LocationType } from './index.android';
export { Type } from './index.ios';

export function hasLocationPermissions(): boolean;

export function requestLocationPermission(): Promise<boolean>;

export function isLocationEnabled(): boolean;

