import { TFile } from "obsidian";
import { getAllDailyNotes, getDateUID, getDateFromFile } from "obsidian-daily-notes-interface";

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
  
  export function getYearData(year: number, notes: Map<string, TFile>, activeFile: TFile | null) {
  
    type NoteData = {
      uid: string;    // The unique identifier of the file
      file: TFile;    // The file object
      activeFile: boolean; // Whether the file is the active file
    };
  
    type WeeksData = {
      [key: number]: NoteData[]; // Mapping from week label to an array of TFile objects
    };
  
    const weeks: WeeksData = {};
    notes.forEach((file, uid) => {
      const weekNumber = getDateFromFile(file, "day")?.week();
  
      if (weekNumber === undefined) {
        return;
      }
  
      // Check if the week already exists in the weeks object
      if (!weeks[weekNumber]) {
        weeks[weekNumber] = [];
      }
  
      // Create an object containing both uid and file
      const noteData: NoteData = { uid, file, activeFile: activeFile === file };
  
      // Push the noteData into the corresponding week's array
      weeks[weekNumber].push(noteData);
    });
  
    interface YearDataEntry {
      week: number;
      notes: NoteData[];
      value: 1; // Ensures that value is always 1
    }
    
    type YearData = YearDataEntry[]; // An array of YearDataEntry
  
    const yearData: YearDataEntry[] = [];
    for (let i = 1; i <= 52; i++) {
      const notes = weeks[i] || []; // Get notes for the week or an empty array if none exist
      yearData.push({ "week": i, "notes": notes, value: 1 });
    }
    return yearData;
  }