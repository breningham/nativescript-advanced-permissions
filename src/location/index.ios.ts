export enum RequestType {
    WHEN_IN_USE = 'WhenInUse',
    ALWAYS = 'Always'
}

let locationManager, locationListener;

class LocationListener extends NSObject implements CLLocationManagerDelegate {

    public static ObjCProtocols = [CLLocationManagerDelegate];
    private _resolves: any = [];
    private _didSetup: boolean;

    public locationManagerDidChangeAuthorizationStatus(manager: any, status: number) {
        if (!this._didSetup) {
            this._didSetup = true;
            return;
        }
        const len = this._resolves.length;

        for (let i = 0; i < len; i++) {
            this._resolves[i](status);
        }
    }

    public setupPromise(resolve: () => void) {
        if (this._resolves === undefined) {
            this._resolves = [];
        }
        this._resolves.push(resolve);
    }

}

function getLocationAuthorizationStatus(): number {
    return CLLocationManager.authorizationStatus();
}

function isLocationAuthorized(): boolean {
    let status: any = this.getLocationAuthorizationStatus();
    return status === CLAuthorizationStatus.kCLAuthorizationStatusAuthorized || status === CLAuthorizationStatus.kCLAuthorizationStatusAuthorizedWhenInUse;
}

export function hasLocationPermissions() {
    return isLocationEnabled() && isLocationAuthorized();
}

export function requestLocationPermission( type: RequestType = RequestType.WHEN_IN_USE) {
    let status: number = this.getLocationAuthorizationStatus();

    if (status !== CLAuthorizationStatus.kCLAuthorizationStatusNotDetermined) {
        return Promise.resolve(isLocationAuthorized());
    }

    if (!locationListener) {
        locationListener = new LocationListener();
    }

    if (!locationManager) {
        locationManager = new CLLocationManager();
        locationManager.delegate = locationListener;
    }

    locationManager[`request${type}Authorization`]();

    return new Promise((resolve, reject) => {
        locationListener.setupPromise(resolve);
    });
}

export function isLocationEnabled(): boolean {
    return CLLocationManager.locationServicesEnabled();
}