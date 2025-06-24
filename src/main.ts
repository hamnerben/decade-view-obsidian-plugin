import { Plugin, WorkspaceLeaf, setIcon, App } from "obsidian";
import { getAllDailyNotes, getDateUID } from "obsidian-daily-notes-interface";

import { DecadeView, DECADE_VIEW } from "./view";  // todo: remove createDailyNotesStore from here


export default class DailyNotePlugin extends Plugin {
public lastMarkdownLeaf: WorkspaceLeaf | null = null;
  

  async onload() {
    
    this.registerView(
      DECADE_VIEW,
      (leaf) => new DecadeView(this.app, leaf)
           
    );

    this.addRibbonIcon("calendar-clock", "Decade View", () => {
      this.toggleDecadeView();
      console.log("activateView");
    });


this.registerEvent(
  this.app.workspace.on("active-leaf-change", (leaf) => {
    if (leaf?.view.getViewType() === "markdown") {
      this.lastMarkdownLeaf = leaf;
    }
  })
);

  }

  async onunload() {
  }

async toggleDecadeView() {
  const { workspace } = this.app;
  const leaves = workspace.getLeavesOfType(DECADE_VIEW);

  if (leaves.length > 0) {
    // Decade view is already open → close it
    for (const leaf of leaves) {
      leaf.detach();
    }
  } else {
    // Decade view is not open → open it
    const leaf = workspace.getRightLeaf(false);
    if (!leaf) {
      console.error("No right leaf available to open Decade View.");
      return;
    }
    await leaf.setViewState({ type: DECADE_VIEW, active: true });
    workspace.revealLeaf(leaf);
  }
}
}