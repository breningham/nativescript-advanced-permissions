import { Observable } from 'tns-core-modules/data/observable';

import { openAppSettings, openSettings, openWifiSettings } from 'nativescript-advanced-permissions/core';
import { requestCameraPermissions, hasCameraPermissions } from 'nativescript-advanced-permissions/camera';
import { hasLocationPermissions, isLocationEnabled, requestLocationPermissions } from 'nativescript-advanced-permissions/location';
import { hasCalendarPermissions, requestCalendarPermissions } from 'nativescript-advanced-permissions/calendar';
import { requestFilePermissions, hasFilePermissions } from 'nativescript-advanced-permissions/files';


import { isIOS } from 'tns-core-modules/platform';
import { getCurrentLocation, Location } from 'nativescript-geolocation';
import { Accuracy } from 'tns-core-modules/ui/enums';

export class HelloWorldModel extends Observable {

  hasLocationPermission: boolean = false;

  location: Observable = new Observable();
  camera: Observable = new Observable();
  files: Observable = new Observable();
  calendar: Observable = new Observable();
  settings: Observable = new Observable();

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

  CALENDAR_MESSAGES: {
    GRANTED: string,
    DENIED: string
  } = {
    GRANTED: 'Calendar Permissions Granted',
    DENIED: 'Calendar Permisions Denied'
  };


  constructor() {
    super();

    const appSettings = new Observable();
    appSettings.set('message', 'Click the Button Below to Open App Settings');

    this.location.set('message', hasLocationPermissions() ? this.LOCATION_MESSAGES.GRANTED : this.LOCATION_MESSAGES.DENIED);
    this.location.set('hasPermission', hasLocationPermissions());
    this.location.set('coords', '0, 0');

    this.camera.set('hasPermission', hasCameraPermissions());
    this.camera.set('message', hasCameraPermissions() ? this.CAMERA_MESSAGES.GRANTED : this.CAMERA_MESSAGES.DENIED);

    this.files.set('message', hasFilePermissions() ? this.FILES_MESSAGES.GRANTED : this.FILES_MESSAGES.DENIED);

    this.calendar.set('message', hasCalendarPermissions() ? this.CALENDAR_MESSAGES.GRANTED : this.CALENDAR_MESSAGES.DENIED);
    this.settings.set('app', appSettings);
    this.settings.set('message', 'Click the Button Below to Open Settings');

  }

  requestLocationPermissions() {
    console.log('requestLocationPermissions START');
    console.log('requesting location permission');
    requestLocationPermissions().then((hasPermission) => {
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
    requestCameraPermissions().then((hasPermission) => {
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

  requestCalendarPermissions() {
    console.log('requestCalendarPermissions START');
    console.log('requesting Calendar permission');
    requestCalendarPermissions().then((permissionsGranted) => {
      console.log('request complete do we have permissions? : %s', permissionsGranted ? 'Yes' : 'No' );
      if ( permissionsGranted ) {
        this.calendar.set('message', this.CALENDAR_MESSAGES.GRANTED);
      } else {
        this.calendar.set('message', this.CALENDAR_MESSAGES.DENIED);
      }
    });
  }

  goToAppSettings() {

    openAppSettings().then(() => {
      const appSettings = this.settings.get('app');

      appSettings.set('message', 'Welcome back to the application');
      this.settings.set('app', appSettings);
    });
  }

  goToSettings() {
    openSettings().then(() => {
      this.settings.set('message', 'Welcome back to the application');
    });
  }

  requestMultiplePermissions() {

    let hasLocationPermission = false;
    let hasCameraPermission = false;
    requestLocationPermissions().then((permission) => {
      hasLocationPermission = permission;
      return requestCameraPermissions();
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
    });
  }
}
