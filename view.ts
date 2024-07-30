import { ItemView, WorkspaceLeaf } from "obsidian";

export const DECADE_VIEW = "decade-view";

export class DecadeView extends ItemView {
    constructor(leaf: WorkspaceLeaf) {
      super(leaf);
    }
  
    getViewType() {
      return DECADE_VIEW;
    }
  
    getDisplayText() {
      return "Decade-View";
    }
  
    async onOpen() {
      const container = this.containerEl.children[1];
      container.empty();
      container.createEl("h4", { text: "Decade View" });
      container.createEl("p", { text: "2019" });
      container.createEl("p", { text: "2020" });
      container.createEl("p", { text: "2021" });
    }
  
    async onClose() {
      // Nothing to clean up.
    }
  }