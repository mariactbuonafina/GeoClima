import {
  findClosestIonContent,
  scrollToTop
} from "./chunk-WFCJTQWE.js";
import {
  readTask,
  writeTask
} from "./chunk-TTEC2IY3.js";
import {
  componentOnReady
} from "./chunk-L6BHBXTE.js";
import "./chunk-ZWBDDU4U.js";
import {
  __async
} from "./chunk-QHQP2P2Z.js";

// node_modules/@ionic/core/components/status-tap.js
var startStatusTap = () => {
  const win = window;
  win.addEventListener("statusTap", () => {
    readTask(() => {
      const width = win.innerWidth;
      const height = win.innerHeight;
      const el = document.elementFromPoint(width / 2, height / 2);
      if (!el) {
        return;
      }
      const contentEl = findClosestIonContent(el);
      if (contentEl) {
        new Promise((resolve) => componentOnReady(contentEl, resolve)).then(() => {
          writeTask(() => __async(null, null, function* () {
            contentEl.style.setProperty("--overflow", "hidden");
            yield scrollToTop(contentEl, 300);
            contentEl.style.removeProperty("--overflow");
          }));
        });
      }
    });
  });
};
export {
  startStatusTap
};
/*! Bundled license information:

@ionic/core/components/status-tap.js:
  (*!
   * (C) Ionic http://ionicframework.com - MIT License
   *)
*/
//# sourceMappingURL=status-tap-2SD5724G.js.map
