
// EKAuthorizationStatus
declare const EKEntityTypeEvent;


export function getCalendarAuthorizationStatus(): number {
    return EKEventStore.authorizationStatusForEntityType(EKEntityTypeEvent);
}

export function hasCalendarPermissions() {
    return getCalendarAuthorizationStatus() === EKAuthorizationStatus.Authorized;
}

export function requestCalendarPermissions() {
    let eventStore: EKEventStore;

    if (eventStore == null) {
        eventStore = new EKEventStore();
    }
    return new Promise((resolve, reject) => {
        eventStore.requestAccessToEntityTypeCompletion(EKEntityTypeEvent, function(status, error) {
            if (error) {
                return reject(new Error(error.description));
            } else {
                return resolve(status);
            }
        });
    });
}