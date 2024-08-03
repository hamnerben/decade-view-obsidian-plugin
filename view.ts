import { ItemView, TFile, WorkspaceLeaf } from "obsidian";
import { getAllDailyNotes, getDateUID, getDateFromFile } from "obsidian-daily-notes-interface";


export const DECADE_VIEW = "decade-view";

/**
 * 
 * @returns notes: {uid: Tfile}, 
 *          years: number[]  // all years that have daily notes
 */
export function createDailyNotesStore() {
  const notes = getAllDailyNotes(); // uid: Tfile
  let years = new Map<number, Record<string, TFile>>();
  
  Object.entries(notes).forEach(([, file]) => {
  
      const date = getDateFromFile(file, "day");
  
      if (date) {
        const year = date.year();
          if (!years.has(year)) {
              years.set(year, []);
          }
          years.get(year)?.push(file);
      }
  });

  return years;

}

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

      const store = createDailyNotesStore();
      store.years.forEach((year) => {
        container.createEl("p", { text: `${year} (${year.length})` });
      });
      container.createEl("p", { text: "LEt's see here" });
      console.log("opening");
    }
  
    async onClose() {
      // Nothing to clean up.
    }
  }