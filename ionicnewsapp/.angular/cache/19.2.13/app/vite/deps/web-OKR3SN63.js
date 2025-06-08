import {
  WebPlugin
} from "./chunk-XKCHHSDS.js";
import {
  __async
} from "./chunk-QHQP2P2Z.js";

// node_modules/@capacitor/geolocation/dist/esm/web.js
var GeolocationWeb = class extends WebPlugin {
  getCurrentPosition(options) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((pos) => {
          resolve(pos);
        }, (err) => {
          reject(err);
        }, Object.assign({
          enableHighAccuracy: false,
          timeout: 1e4,
          maximumAge: 0
        }, options));
      });
    });
  }
  watchPosition(options, callback) {
    return __async(this, null, function* () {
      const id = navigator.geolocation.watchPosition((pos) => {
        callback(pos);
      }, (err) => {
        callback(null, err);
      }, Object.assign({
        enableHighAccuracy: false,
        timeout: 1e4,
        maximumAge: 0,
        minimumUpdateInterval: 5e3
      }, options));
      return `${id}`;
    });
  }
  clearWatch(options) {
    return __async(this, null, function* () {
      navigator.geolocation.clearWatch(parseInt(options.id, 10));
    });
  }
  checkPermissions() {
    return __async(this, null, function* () {
      if (typeof navigator === "undefined" || !navigator.permissions) {
        throw this.unavailable("Permissions API not available in this browser");
      }
      const permission = yield navigator.permissions.query({
        name: "geolocation"
      });
      return {
        location: permission.state,
        coarseLocation: permission.state
      };
    });
  }
  requestPermissions() {
    return __async(this, null, function* () {
      throw this.unimplemented("Not implemented on web.");
    });
  }
};
var Geolocation = new GeolocationWeb();
export {
  Geolocation,
  GeolocationWeb
};
//# sourceMappingURL=web-OKR3SN63.js.map
