import {
  registerPlugin
} from "./chunk-XKCHHSDS.js";
import {
  __async
} from "./chunk-QHQP2P2Z.js";

// node_modules/@capacitor/synapse/dist/synapse.mjs
function s(t) {
  t.CapacitorUtils.Synapse = new Proxy({}, {
    get(e, o) {
      return new Proxy({}, {
        get(w, r) {
          return (c, p, n) => {
            const i = t.Capacitor.Plugins[o];
            if (i === void 0) {
              n(new Error(`Capacitor plugin ${o} not found`));
              return;
            }
            if (typeof i[r] != "function") {
              n(new Error(`Method ${r} not found in Capacitor plugin ${o}`));
              return;
            }
            (() => __async(null, null, function* () {
              try {
                const a = yield i[r](c);
                p(a);
              } catch (a) {
                n(a);
              }
            }))();
          };
        }
      });
    }
  });
}
function u(t) {
  t.CapacitorUtils.Synapse = new Proxy({}, {
    get(e, o) {
      return t.cordova.plugins[o];
    }
  });
}
function y(t = false) {
  window.CapacitorUtils = window.CapacitorUtils || {}, window.Capacitor !== void 0 && !t ? s(window) : window.cordova !== void 0 && u(window);
}

// node_modules/@capacitor/geolocation/dist/esm/index.js
var Geolocation = registerPlugin("Geolocation", {
  web: () => import("./web-OKR3SN63.js").then((m) => new m.GeolocationWeb())
});
y();
export {
  Geolocation
};
//# sourceMappingURL=@capacitor_geolocation.js.map
