import { randomID } from "@/helpers";

let portalId = null as string | null;
const listeners = new Set<VoidFunction>();

const portalElementStore = {
  getElement: () => {
    if (!portalId) portalId = randomID();
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
      const canRemove = listeners.size === 0 && !!portalId;
      const element = document.getElementById(portalId || "");
      if (canRemove && element) document.body.removeChild(element);
    };
  },
};

export default portalElementStore;
