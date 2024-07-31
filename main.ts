import { Plugin, WorkspaceLeaf } from "obsidian";
import { getAllDailyNotes } from "obsidian-daily-notes-interface";

import { DecadeView, DECADE_VIEW } from "./view";

export default class DailyNotePlugin extends Plugin {
  async onload() {
    this.registerView(
      DECADE_VIEW,
      (leaf) => new DecadeView(leaf)
    );

    // this.addRibbonIcon("calendar", "Activate decade view", () => {
    //   this.activateView();
    // });

    this.addRibbonIcon("dice", "getNOte3e", () => {
      const notes = getAllDailyNotes(); 
      console.log( notes );
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
      await leaf.setViewState({ type: DECADE_VIEW, active: true });
    }

    // "Reveal" the leaf in case it is in a collapsed sidebar
    workspace.revealLeaf(leaf);
  }
}