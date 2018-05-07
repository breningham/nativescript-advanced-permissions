import { android as androidApp } from "tns-core-modules/application";
import { requestPermission as RequestAndroidPermission, hasPermission as HasAndroidPermission } from "nativescript-permissions";

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
    return RequestAndroidPermission( permission, reason );
}

export function hasPermission( permission: any ) {
    return HasAndroidPermission( permission );
}

export function openAppSettings() {
    const currentActivity = androidApp.foregroundActivity;
    const packageUrl = android.net.Uri.fromParts('package', androidApp.packageName, null);
    const intent = new android.content.Intent();
    intent.setAction(android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
    intent.setData(packageUrl);
    intent.addCategory( android.content.Intent.CATEGORY_DEFAULT);
    intent.setFlags( android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
    currentActivity.startActivity(intent);
}