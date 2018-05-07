var Permissions = require("nativescript-permissions").Permissions;

describe("Project Integrety", function() {

    describe("RequestCameraPermission", function() {
        it("exists", function() {
            expect(Permissions.requestCameraPermission).toBeDefined();
        });

        it("requests the Camera Permissions", function() {
            expect(Permissions.requestCameraPermission()).toEventuallyEquall("Hello, NS");
        });
    });

});