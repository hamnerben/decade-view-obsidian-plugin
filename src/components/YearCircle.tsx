import { TFile } from "obsidian";

interface YearCircleProps {
  notes: Map<string, TFile>;
  year: string
}

export default function YearCircle({ notes, year }: YearCircleProps) {
  return (
    <div>
      <h5>{year} ({notes.size})</h5>
      <ul>
        {[...notes.entries()].map(([uid, note]) => (
          <li key={uid}>{note.basename}</li>
        ))}
      </ul>
    </div>
  );
}
