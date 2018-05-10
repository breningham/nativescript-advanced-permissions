import { openUrl } from "tns-core-modules/utils/utils";
import { ios as IOSApp, iOSApplication } from "tns-core-modules/application";


export function requestPermission() {
    throw new Error('You Should not be using this for IOS');
}

export function hasPermission() {
    throw new Error('You Should not be using this for IOS');
}

export function openAppSettings() {
    openUrl(UIApplicationOpenSettingsURLString);
}

export function getContext() {
    throw new Error('Not Implemented for IOS');
}

export function openSettings() {
    return new Promise((resolve) => {
        openUrl("App-Prefs:root=Privacy&path=LOCATION");
        resolve();
    });
}

export function openWifiSettings() {
    return new Promise((resolve) => {
        openUrl("App-Prefs:root=WIFI");
        resolve();
    });
}
