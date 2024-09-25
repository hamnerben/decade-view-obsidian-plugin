import {TFile} from "obsidian";

interface YearCirlceProps {
  year: Map<string, TFile>;
}

export default function YearCircle({ year }: YearCirlceProps) {
    return (
       
            <div>
              <h5>{year} ({year.size})</h5>
              <ul>
                {year.forEach((TFile: note, string: uid) => (
                  <li key={uid}>{note.basename}</li>
                ))}
              </ul>
        </div>
    )
}