import { openUrl } from "tns-core-modules/utils/utils";

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