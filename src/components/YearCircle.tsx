export default function YearCircle({notes, year}) {
    return (
       
            <div>
        
            store.forEach((notes, year) => {
              container.createEl("h5", { text: `${year} (${notes.size})` });
              const ul = container.createEl("ul");
              notes.forEach((note, uid) => {
                ul.createEl("li", { text: note.basename });
              });
            });

        </div>
    )
}