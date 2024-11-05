# Obsidian Decade View Plugin

This plugin provides a decade-long visualization of daily notes in Obsidian, helping users track and reflect on their journaling and note-taking habits over multiple years. Each year is represented as a circular chart, with individual weeks displayed as segments that change color based on the activity level.

## Features

Decade View Dashboard: Visualize multiple years of daily notes in a compact, easy-to-read format.  

Each cell corresponds to a week starting with the first week of the year at the 12:00 position of the circle and following clockwise.

- Interactive Yearly Donut Charts:
- Empty (No Notes): transparent for weeks with no entries.
- Non-open weeks (Notes Exist): Grey cell indicates the presence of notes in that week.
- Active Note: Highlighted color shows week corresponding to open note.
- Responsive Design: Automatically updates when new notes are added, allowing users to quickly access relevant years and weeks.

## Installation

Clone the repository to your Obsidian plugins folder.

**bash**

`git clone <repository-url> .obsidian/plugins/obsidian-decade-view`

In Obsidian, navigate to Settings > Community Plugins and enable the Decade View plugin.

## Usage

Open the Decade View dashboard via the plugin's command in Obsidian.
Browse through your notes by year, and click on a specific year to expand and view individual weeks.
When opening a note, the plugin highlights the corresponding week in the year view, providing quick access to the most relevant timeframes.

## Development Notes

Built with React and D3: Combines React for UI management and D3 for data visualization.
Dynamic Data Binding: The plugin pulls note data directly from Obsidian's daily notes to keep each year chart updated.
Customizable: Easily adapt the color scheme and yearly structure in the settings or codebase.

## Example

![Desktop Example View](src\images\example.png)

## Contributing

Fork the repository.
Create a new branch for your feature or bug fix.
Submit a pull request with a description of the change.

## License

This project is licensed under the MIT License.

# Thank you for your support!
<p align="center">
<a  href="https://www.buymeacoffee.com/hamnerben" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
</p>