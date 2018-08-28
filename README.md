# nativescript-advanced-permissions

[![npm version](https://badge.fury.io/js/nativescript-advanced-permissions.svg)](https://badge.fury.io/js/nativescript-advanced-permissions)

[![Build Status](https://travis-ci.org/breningham/nativescript-advanced-permissions.svg?branch=master)](https://travis-ci.org/breningham/nativescript-advanced-permissions)

This Plugin is a wrap around Nathanael's nativescript-permissions plugin, while providing IOS Permissions with a matching API.

## Installation

Describe your plugin installation steps. Ideally it would be something like:

```bash
tns plugin add nativescript-advanced-permissions
```

## Usage 

Right now to request the Camera Permissions, we use it like this
	
```javascript
    
    import { hasCameraPermissions, requestCameraPermissions } from 'nativescript-advanced-permissions/camera';

    // also supports 'nativescript-advanced-permissions/files';
    // also supports 'nativescript-advanced-permissions/calendar';
    // also supports 'nativescript-advanced-permissions/location';


    if( !hasCameraPermissions() ) {
        requestCameraPermissions().then((hasPermission) => {
            if( hasPermission ) {
                // do something cool
            } else {
                // don't do something
            }
        });
    }

```

## API

this plugin has been split into smaller 'sub-modules', which when use give access to the specified permissions.

the sub-modules that we currently include are :  `files`, `calendar`, `location`, `camera`

and for each sub-module we follow the same naming convention: `requestXPermission/hasXPermission` where x is the capitalised sub-module name.

### Camera Module

#### Usage 

```(javascript)
    import { hasCameraPermission, requestCameraPermission } from 'nativescript-advanced-permissions/camera';

    if( !hasCameraPermission() ) {
        requestCameraPermission().then((hasPermission) => {
            if( hasPermission ) {
                // do something cool
            } else {
                // don't do something
            }
        });
    }
```

#### API

| Function | Return Type | Description |
| --- | --- | --- |
| hasCameraPermission() | boolean | returns whether or not the application has the permissions to use the camera |
| requestCameraPermission() | Promise<boolean> | requests the user to allow Camera Permissions, returns a truthy promise if they do, and returns falsy if they don't |

### Location Module

#### Usage 

```(javascript)
    import { goToAppSettings } from 'nativescript-advanced-permissions/core';
    import { hasLocationPermission, requestLocationPermission, isLocationEnabled } from 'nativescript-advanced-permissions/location';

    if ( isLocationEnabled() ) {

        if( !hasCameraPermission() ) {
            requestCameraPermission().then((hasPermission) => {
                if( hasPermission ) {
                    // do something cool
                } else {
                    // don't do something
                }
            });
        }

    } else {
        // tell the user to enable Location Services.
        alert('Please Enable Location Settings...').then(() => goToAppSettings());
    }
```

#### API

| Function | Return Type | Description |
| --- | --- | --- |
| hasLocationPermission() | boolean | returns whether or not the application has the permissions to use the Location Services |
| requestLocationPermission() | Promise<boolean> | requests the user to allow Location Permissions, returns a truthy promise if they do, and returns falsy if they don't |
| isLocationEnabled() | boolean | returns whether or not the location services are enabled on device. |


### Calendar Module

#### Usage 

```(javascript)
    import { hasCalendarPermission, requestCalendarPermission } from 'nativescript-advanced-permissions/calendar';
        if( !hasCalendarPermission() ) {
            requestCalendarPermission().then((hasPermission) => {
                if( hasPermission ) {
                    // do something cool
                } else {
                    // don't do something
                }
            });
        }
```

#### API

| Function | Return Type | Description |
| --- | --- | --- |
| hasCalendarPermission() | boolean | returns whether or not the application has the permissions to use the Calendar |
| requestCalendarPermission() | Promise<boolean> | requests the user to allow Calendar Permissions, returns a truthy promise if they do, and returns falsy if they don't |





## License

Apache License Version 2.0, January 2004

## Special Thanks!

Thanks to the genius Nathaniel Anderson for the Android Permissions Plugin, which i make use of in this plugin
[ Nativescript-Permissions ](https://github.com/NathanaelA/nativescript-permissions)
