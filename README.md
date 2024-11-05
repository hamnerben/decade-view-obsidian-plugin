Obsidian Decade View Plugin

This plugin provides a decade-long visualization of daily notes in Obsidian, helping users track and reflect on their journaling and note-taking habits over multiple years. Each year is represented as a circular chart, with individual weeks displayed as segments that change color based on the activity level.
Features

    Decade View Dashboard: Visualize up to 10 years of daily notes in a compact, easy-to-read format.
    Interactive Yearly Donut Charts:
        Empty (No Notes): Grey for weeks with no entries.
        Inactive (Notes Exist): Color indicates the presence of notes but no recent activity.
        Active (Recent Notes): Highlighted color shows weeks with recent, active notes.
    Responsive Design: Automatically updates when new notes are added, allowing users to quickly access relevant years and weeks.

Installation

    Clone the repository to your Obsidian plugins folder.

    bash

    git clone <repository-url> .obsidian/plugins/obsidian-decade-view

    In Obsidian, navigate to Settings > Community Plugins and enable the Decade View plugin.

Usage

    Open the Decade View dashboard via the plugin's command in Obsidian.
    Browse through your notes by year, and click on a specific year to expand and view individual weeks.
    When opening a note, the plugin highlights the corresponding week in the year view, providing quick access to the most relevant timeframes.

Development Notes

    Built with React and D3: Combines React for UI management and D3 for data visualization.
    Dynamic Data Binding: The plugin pulls note data directly from Obsidian's daily notes to keep each year chart updated.
    Customizable: Easily adapt the color scheme and yearly structure in the settings or codebase.

Example

![src\images\example.png]
Contributing

    Fork the repository.
    Create a new branch for your feature or bug fix.
    Submit a pull request with a description of the change.

License

This project is licensed under the MIT License.