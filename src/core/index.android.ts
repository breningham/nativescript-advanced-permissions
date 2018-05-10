import { android as androidApp,  AndroidActivityResultEventData, AndroidApplication } from "tns-core-modules/application";
import { requestPermission as RequestAndroidPermission, hasPermission as HasAndroidPermission } from "nativescript-permissions";

enum resultCodes {
    RETURN_FROM_SETTINGS = 1000,
    RETURN_FROM_APP_SETTINGS = 1001,
    RETURN_FROM_WIFI_SETTINGS = 1002
}

export function getContext() {
    const ctx = java.lang
                    .Class
                    .forName("android.app.AppGlobals")
                    .getMethod("getInitialApplication", null)
                    .invoke(null, null);

    if (ctx) { return ctx; }

    return java.lang
               .Class
               .forName("android.app.ActivityThread")
               .getMethod("currentApplication", null)
               .invoke(null, null);
}

export function requestPermission(permission: any, reason?: string) {
    return RequestAndroidPermission( permission, reason ).then(( hasPermissions ) => hasPermissions, err => (err) => {
        console.log('Permission request Error!');
        console.log(err);
        return false;
    });
}

export function hasPermission( permission: any ) {
    if ( Array.isArray(permission) ) {
        return (permission as Array<any>).map( perm => HasAndroidPermission(perm)).every(Boolean);
    } else {
        return HasAndroidPermission( permission );
    }
}

export function openAppSettings() {

    return new Promise((resolve) => {

        androidApp.addEventListener( AndroidApplication.activityResultEvent, (data: AndroidActivityResultEventData) => {
            if ( data.requestCode ===  resultCodes.RETURN_FROM_APP_SETTINGS) {
                androidApp.off(AndroidApplication.activityResultEvent);
                resolve();
            }
        });

        const currentActivity = androidApp.foregroundActivity;
        const packageUrl = android.net.Uri.fromParts('package', androidApp.packageName, null);
        const intent = new android.content.Intent();
        intent.setAction(android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        intent.setData(packageUrl);
        intent.addCategory( android.content.Intent.CATEGORY_DEFAULT);
        intent.setFlags( android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
        currentActivity.startActivityForResult(intent, resultCodes.RETURN_FROM_APP_SETTINGS);

    });
}


export function openSettings() {

    return new Promise((resolve) => {
        androidApp.addEventListener( AndroidApplication.activityResultEvent, (data: AndroidActivityResultEventData) => {
            if ( data.requestCode ===  resultCodes.RETURN_FROM_SETTINGS) {
                androidApp.off(AndroidApplication.activityResultEvent);
                resolve();
            }
        });

        const currentActivity = androidApp.foregroundActivity;
        const intent = new android.content.Intent(android.provider.Settings.ACTION_SETTINGS);
        currentActivity.startActivityForResult(intent, resultCodes.RETURN_FROM_SETTINGS);
    });
}

export function openWifiSettings() {

    return new Promise((resolve) => {
        androidApp.addEventListener( AndroidApplication.activityResultEvent, (data: AndroidActivityResultEventData) => {
            if ( data.requestCode ===  resultCodes.RETURN_FROM_WIFI_SETTINGS) {
                androidApp.off(AndroidApplication.activityResultEvent);
                resolve();
            }
        });

        const currentActivity = androidApp.foregroundActivity;
        const intent = new android.content.Intent(android.provider.Settings.ACTION_WIRELESS_SETTINGS);
        currentActivity.startActivityForResult(intent, resultCodes.RETURN_FROM_WIFI_SETTINGS);
    });
}