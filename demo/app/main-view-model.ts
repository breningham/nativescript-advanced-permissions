import { Observable } from 'tns-core-modules/data/observable';

import { openAppSettings } from 'nativescript-advanced-permissions/core';
import { 
  requestCalendarPermissions,
  hasCalendarPermissions,
  requestFilePermissions,
  hasFilePermissions,
  requestCameraPermission,
  hasCameraPermission,
  requestLocationPermission, 
  hasLocationPermissions
} from 'nativescript-advanced-permissions';


import { isIOS } from 'tns-core-modules/platform';
import { getCurrentLocation, Location } from 'nativescript-geolocation';
import { Accuracy } from 'tns-core-modules/ui/enums';

export class HelloWorldModel extends Observable {

  hasLocationPermission: boolean = false;

  location: Observable = new Observable();
  camera: Observable = new Observable();
  files: Observable = new Observable();

  LOCATION_MESSAGES: {
    GRANTED: string,
    DENIED: string
  } = {
    GRANTED: 'Location Permissions Granted',
    DENIED: 'Location Permissions Denied'
  };

  CAMERA_MESSAGES: {
    GRANTED: string,
    DENIED: string
  } = {
    GRANTED: 'Camera Permissions Granted',
    DENIED: 'Camera Permissions Denied'
  };

  FILES_MESSAGES: {
    GRANTED: string,
    DENIED: string
  } = {
    GRANTED: 'File Permissions Granted',
    DENIED: 'File Permissions Denied'
  };


  constructor() {
    super();

    this.location.set('message', hasLocationPermissions() ? this.LOCATION_MESSAGES.GRANTED : this.LOCATION_MESSAGES.DENIED);
    this.location.set('hasPermission', hasLocationPermissions());
    this.location.set('coords', '0, 0');

    this.camera.set('hasPermission', hasCameraPermission());
    this.camera.set('message', hasCameraPermission() ? this.CAMERA_MESSAGES.GRANTED : this.CAMERA_MESSAGES.DENIED);

    this.files.set('message', hasFilePermissions() ? this.FILES_MESSAGES.GRANTED : this.FILES_MESSAGES.DENIED);
  }

  requestLocationPermissions() {
    console.log('requestLocationPermissions START');
    console.log('requesting location permission');
    requestLocationPermission().then((hasPermission) => {
      console.log(`permission ${hasPermission ? 'granted' : 'denied'}`);
      this.location.set('hasPermission', hasPermission);
      this.location.set('message', hasPermission ? this.LOCATION_MESSAGES.GRANTED : this.LOCATION_MESSAGES.DENIED);

      return getCurrentLocation({ desiredAccuracy: Accuracy.high });
    }).then((location: Location) => {
      this.location.set('coords', `${location.latitude}, ${location.longitude}`);
    });
    console.log('requestLocationPermissions END');
  }

  requestCameraPermission() {
    console.log('requestCameraPermission START');
    requestCameraPermission().then((hasPermission) => {
      console.log(`permission ${hasPermission ? 'granted' : 'denied'}`);
      this.camera.set('message', hasPermission ? this.CAMERA_MESSAGES.GRANTED : this.CAMERA_MESSAGES.DENIED);
    });
    console.log('requestCameraPermission END');
  }

  requestFilesPermission() {
    console.log('requestFilesPermission START');
    requestFilePermissions().then((permissionGranted) => {
      const permissionStatus = permissionGranted ? 'GRANTED' : 'DENIED';

      this.files.set('message', this.FILES_MESSAGES[permissionStatus]);
    });

    console.log('requestFilesPErmission END');
  }

  goToSettings() {
    openAppSettings();
  }

  requestMultiplePermissions() {

    let hasLocationPermission = false;
    let hasCameraPermission = false;
    requestLocationPermission().then((permission) => {
      hasLocationPermission = permission;
      return requestCameraPermission()
    }).then((hasPermission) => {
      hasCameraPermission = hasPermission;
      return Promise.resolve([ hasLocationPermission, hasCameraPermission ]);
    }).then(([ hasLocationPermission, hasCameraPermission ]) => {
      if ( hasLocationPermission ) {
        this.location.set('message', this.LOCATION_MESSAGES['GRANTED']);
      }

      if ( hasCameraPermission ) {
        this.camera.set('message', this.CAMERA_MESSAGES['GRANTED']);
      }
    }).catch(e => {
      console.log('### FAILED ###');
      console.log(`message: ${JSON.stringify(e, null, 4)}`);
    })
  }
}
