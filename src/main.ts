import { Plugin, WorkspaceLeaf } from "obsidian";
import { getAllDailyNotes, getDateUID } from "obsidian-daily-notes-interface";

import { DecadeView, DECADE_VIEW, createDailyNotesStore, getYearData } from "./view";  // todo: remove createDailyNotesStore from here


export default class DailyNotePlugin extends Plugin {
  async onload() {
    this.registerView(
      DECADE_VIEW,
      (leaf) => new DecadeView(leaf)
    );

    // this.addRibbonIcon("calendar", "Activate THE view", () => {
    //   // this.activateView();
    //   console.log("activateView");
    // });


    this.addRibbonIcon("dice", "get Notes and Sanitized year", () => {
      const store = createDailyNotesStore();
      // console.log("store: ", store);
      const yearData = store.get(2024)!
      // console.log("year: \n", yearData)
      const sanitizedYear = getYearData(2024, yearData);
      // console.log("sanitizedYear: \n", sanitizedYear);
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