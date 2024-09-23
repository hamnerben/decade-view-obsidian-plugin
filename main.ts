import { Plugin, WorkspaceLeaf } from "obsidian";
import { getAllDailyNotes, getDateUID } from "obsidian-daily-notes-interface";

import { DecadeView, DECADE_VIEW, createDailyNotesStore } from "./view";
import { ExampleView, VIEW_TYPE_EXAMPLE } from "./reactView1"


export default class DailyNotePlugin extends Plugin {
  async onload() {
    // this.registerView(
    //   DECADE_VIEW,
    //   (leaf) => new DecadeView(leaf)
    // );

    this.registerView(
      VIEW_TYPE_EXAMPLE,
      (leaf) => new ExampleView(leaf)
    );

    this.addRibbonIcon("calendar", "Activate THE view", () => {
      this.activateView();
    });


    // this.addRibbonIcon("dice", "geteeNOte3e", () => {
    //   let store = createDailyNotesStore();
    //   console.log(store);
    // });
  }

  async onunload() {
  }

  async activateView() {
    const { workspace } = this.app;

    let leaf: WorkspaceLeaf | null = null;
    const leaves = workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE);

    if (leaves.length > 0) {
      // A leaf with our view already exists, use that
      leaf = leaves[0];
    } else {
      // Our view could not be found in the workspace, create a new leaf
      // in the right sidebar for it
      leaf = workspace.getRightLeaf(false);
      await leaf.setViewState({ type: VIEW_TYPE_EXAMPLE, active: true });
    }

    // "Reveal" the leaf in case it is in a collapsed sidebar
    workspace.revealLeaf(leaf);
  }
}