import * as exp from "constants";
import { ItemView, TFile, WorkspaceLeaf, debounce } from "obsidian";
import { getAllDailyNotes, getDateUID, getDateFromFile } from "obsidian-daily-notes-interface";


export const DECADE_VIEW = "decade-view";

/**
 * 
 * @returns notes: {uid: Tfile}, 
 *          years: number[]  // all years that have daily notes
 */
export function createDailyNotesStore() {
  const notes = getAllDailyNotes(); // uid: Tfile
  let years = new Map<number, Map<string, TFile>>();
  
  Object.entries(notes).forEach(([uid, file]) => {
  
      const date = getDateFromFile(file, "day");
  
      if (date) {
        const year = date.year();
          if (!years.has(year)) {
              years.set(year, new Map());
          }
          years.get(year)?.set(uid, file);
      }
  });
  const sortedYears = new Map([...years.entries()].sort((a, b) => a[0] - b[0]));

  

  sortedYears.forEach((notes, year) => {


    const sortedNotes:Map<string, TFile>  = new Map([...notes.entries()].sort());
    sortedYears.set(year, sortedNotes);
  });

  return sortedYears;

}

 function displayDecades(container: Element) {
    const store = createDailyNotesStore();
      
    container.empty();
    container.createEl("h4", { text: "Decdade View" });

    store.forEach((notes, year) => {
      container.createEl("p", { text: `${year} (${notes.size})` });
      const ul = container.createEl("ul");
      notes.forEach((note, uid) => {
        ul.createEl("li", { text: note.basename });
      });
    });

}
export class DecadeView extends ItemView {
  private debouncedRender: () => void;

    constructor(leaf: WorkspaceLeaf) {
      super(leaf);
      this.debouncedRender = debounce(() => this.renderView(), 1000, true);
    }
  
    getViewType() {
      return DECADE_VIEW;
    }
  
    getDisplayText() {
      return "Decade-View";
    }
  


    async onOpen() {
      console.log("opening");
      this.renderView();

      this.registerEvent(
        this.app.vault.on("create", () => this.debouncedRender())
      );
      this.registerEvent(
        this.app.vault.on("delete", () => this.debouncedRender())
      );
      this.registerEvent(
        this.app.vault.on("rename", () => this.debouncedRender())
      );
     
  
    }
  
    async onClose() {
      // Nothing to clean up.
    }


    private renderView() {
      console.log("rendering");
      const container = this.containerEl.children[1];
      displayDecades(container);
    }

    

  }