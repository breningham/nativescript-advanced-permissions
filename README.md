# @spartadigital/nativescript-permissions

This Plugin is a wrap around Nathanael's nativescript-permissions plugin, while providing IOS Permissions with a matching API.

## Installation

Describe your plugin installation steps. Ideally it would be something like:

```bash
tns plugin add @spartadigital/nativescript-permissions
```

## Usage 

Right now to request the Camera Permissions, we use it like this
	
```javascript
    
    import { Permissions } from '@spartadigital/nativescript-plugins';

    if( ! Permissions.hasCameraPermission() ) {
        Permissions.requestCameraPermission().then((hasPermission) => {
            if( hasPermission ) {
                // do something cool
            } else {
                // don't do something
            }
        });
    }

```

## API

We Currently only support a small subset of PermissionRequests for both Android and IOS. 

Currently we Support Camera, Location and CameraRoll. 

| Property | Default | Description |
| --- | --- | --- |
| hasCameraPermission() | false | returns whether or not the application has the permissions to use the camera |
| requestCameraPermission() | Promise<boolean> | requests the user to allow Camera Permissions, returns a truthy promise if they do, and returns falsy if they don't |
    
## License

Apache License Version 2.0, January 2004
