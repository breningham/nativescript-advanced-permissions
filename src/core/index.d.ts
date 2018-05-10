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
 * Android Only! - will throw an error on IOS.
 * @description gets the android applications context.
 */
export function getContext();

/**
 * Opens the Devices Settings.
 */
export function openSettings(): Promise<void>;

/**
 * Opens the Wifi Settings.
 */
export function openWifiSettings(): Promise<void>;

/**
 * opens the applications settings page.
 */
export function openAppSettings(): Promise<void>;