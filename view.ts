import { ItemView, WorkspaceLeaf } from "obsidian";
import { getAllDailyNotes } from "obsidian-daily-notes-interface";


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
      container.createEl("p", { text: "LEt's see here" });
      

    }
  
    async onClose() {
      // Nothing to clean up.
    }
  }