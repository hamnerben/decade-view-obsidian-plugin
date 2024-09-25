import {TFile} from "obsidian";

interface year {
  year: Map<string, TFile>;
}

export default function YearCircle({ year }) {
    return (
       
            <div>
              <h5>{year} ({year.size})</h5>
            
              container.createEl("h5", { text: `${year} (${notes.size})` });
              const ul = container.createEl("ul");
              notes.forEach((note, uid) => {
                ul.createEl("li", { text: note.basename });
              });
            

        </div>
    )
}