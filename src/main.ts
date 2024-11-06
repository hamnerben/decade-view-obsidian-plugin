import { Plugin, WorkspaceLeaf, setIcon } from "obsidian";
import { getAllDailyNotes, getDateUID } from "obsidian-daily-notes-interface";

import { DecadeView, DECADE_VIEW } from "./view";  // todo: remove createDailyNotesStore from here


export default class DailyNotePlugin extends Plugin {
  async onload() {
    
    this.registerView(
      DECADE_VIEW,
      (leaf) => new DecadeView(leaf)
           
    );

    this.addRibbonIcon("calendar", "next note", () => {
      this.app?.commands.executeCommandById("daily-notes:goto-next")
      console.log(this.app);
    });

    this.addRibbonIcon("calendar-clock", "Decade View", () => {
      this.activateView();
      console.log("activateView");
    });

  }

  async onunload() {
  }

  async activateView() {
    const { workspace } = this.app;

    let leaf: WorkspaceLeaf | null = null;
    const leaves = workspace.getLeavesOfType(DECADE_VIEW);

    if (leaves.length > 0) {
      // A leaf with our view already exists, use that
      leaf = leaves[0];
    } else {
      // Our view could not be found in the workspace, create a new leaf
      // in the right sidebar for it
      leaf = workspace.getRightLeaf(false);
      await leaf!.setViewState({ type: DECADE_VIEW, active: true });
    }

    // "Reveal" the leaf in case it is in a collapsed sidebar
    workspace.revealLeaf(leaf!);
    
  }
}