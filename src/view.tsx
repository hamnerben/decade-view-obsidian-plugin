import {StrictMode} from "react";
import {createRoot, Root} from "react-dom/client";
import * as exp from "constants";
import { ItemView, TFile, WorkspaceLeaf, debounce } from "obsidian";
import { getAllDailyNotes, getDateUID, getDateFromFile } from "obsidian-daily-notes-interface";
import YearCircle from "./components/yearCircle";

export const DECADE_VIEW = "decade-view";

/**
 * 
 * @returns 
 * Map<number, Map<string, TFile>>
 * Map<year, Map<uid, TFile>>
 * 
 * example=======================
 * years: {
 *    year: {
 *        uid: TFile,
 *        uid: TFile,
 *    },
 * };     
 */
export function createDailyNotesStore() {
  const notes = getAllDailyNotes(); // uid: Tfile
  let years = new Map<number, Map<string, TFile>>();
  
  Object.entries(notes).forEach(([uid, file]) => {
  
      const date = getDateFromFile(file, "day");
  
      if (date) {
        const year = date.year();
          if (!years.has(year)) {
              years.set(year, new Map());  // create new map for year
          }
          years.get(year)?.set(uid, file);  // add note to year
      }
  });
  const sortedYears = new Map([...years.entries()].sort((a, b) => a[0] - b[0])); // sort the years

  sortedYears.forEach((notes, year) => {
    const sortedNotes:Map<string, TFile>  = new Map([...notes.entries()].sort()); // sort the notes
    sortedYears.set(year, sortedNotes); 
  });

  return sortedYears;
}


export class DecadeView extends ItemView {
  root: Root | null = null;

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
      console.log("opening");
      // this.renderView();

      this.root = createRoot(this.containerEl.children[1]);
      const years = createDailyNotesStore();
    
		  this.root.render(
        <StrictMode>
        <h4>Decade View</h4>
          {years.get(1998) && <YearCircle year="1998" notes={years.get(1998)!}/>}
        </StrictMode>,
		);
     
  
    }
  
    async onClose() {
      // Nothing to clean up.
    }


  }