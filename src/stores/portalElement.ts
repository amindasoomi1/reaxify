import { randomID } from "@/helpers";

const portalId = randomID();
const listeners = new Set<VoidFunction>();

const portalElementStore = {
  getElement: () => {
    const element = document.getElementById(portalId);
    if (element) return element;
    const div = document.createElement("div");
    div.dataset.name = "portal";
    div.id = portalId;
    document.body.appendChild(div);
    return div;
  },
  subscribe: (cb: VoidFunction) => {
    listeners.add(cb);
    return () => {
      listeners.delete(cb);
    };
  },
};

export default portalElementStore;
