import {StrictMode} from "react";
import {createRoot, Root} from "react-dom/client";
import * as exp from "constants";
import { ItemView, TFile, WorkspaceLeaf, debounce } from "obsidian";
import { getAllDailyNotes, getDateUID, getDateFromFile } from "obsidian-daily-notes-interface";
import YearCircle from "./components/YearCircle";
import Donut from "./components/Donut";

export const DECADE_VIEW = "decade-view";

/** 
 * @returns {Map<number, Map<string, TFile>>} A map where the keys are years and the values are another map.
 * 
 * @description
 * This function returns a nested map where:
 * - The outer map has keys as years (number).
 * - The inner map has keys as unique IDs (string) and values as `TFile` objects.
 * 
 * --Example--
 * {
 *    2023: {
 *        "uid1": TFile,
 *        "uid2": TFile,
 *    },
 *    2024: {
 *        "uid3": TFile,
 *        "uid4": TFile,
 *    },
 * }
 * 
 * @typedef {Object} TFile
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

export function getYearData(year: number, notes: Map<string, TFile>) {
  const yearData: { uid: TFile }[] = [];
  notes.forEach((note, uid) => {
    yearData.push({uid: note});
  });
  return yearData;
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

      this.registerEvent(this.app.workspace.on("active-leaf-change", this.onActiveFileChange.bind(this)));

      this.root = createRoot(this.containerEl.children[1]);
    
      // const yearCircles = [...years.entries()].map(([year, notes]) => (
      //   <YearCircle key={year} year={year} notes={notes} /> // Make sure to pass the notes as the correct prop
      // ));
      this.renderView();

    }

    onActiveFileChange = debounce(() => {
      console.log("active file changed");
      this.renderView();
    }, 300);

    
renderView() {
  const years = createDailyNotesStore();
  const yearData = getYearData(2024, years.get(2024)!);
  console.log("rendering view");
  this.root?.render(
    <StrictMode>
    <h4 >Decade View</h4>
    <div >
    {/* <Donut year={1998} data={yearData}/>
    <Donut year={2004} data={yearData}/>
    <Donut year={2013} data={yearData}/>
    <Donut year={2015} data={yearData}/>
    <Donut year={2019} data={yearData}/> */}
    <Donut year={2024} data={yearData}/>
    </div>
    </StrictMode>
);
   
    }
  
    async onClose() {
      if (this.root) {
        this.root.unmount();  // Unmount React components
        this.root = null;     // Clean up the root reference
      }
    }


  }