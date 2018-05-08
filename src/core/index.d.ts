/**
 * Android Only! - will throw an error on IOS.
 * @param permission : the Android Permission.
 */
export function requestPermission(permission: any, reason?: string);

/**
 * Android Only! - will throw an error on IOS.
 * @param permission : the Android Permission.
 */
export function hasPermission(permission: any);

/**
 * opens the applications settings page.
 */
export function openAppSettings();

/**
 * Android Only! - will throw an error on IOS.
 * @description gets the android applications context.
 */
export function getContext();