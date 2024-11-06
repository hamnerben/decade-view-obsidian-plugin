import { StrictMode } from "react";
import { createRoot, Root } from "react-dom/client";
import { ItemView, WorkspaceLeaf, debounce } from "obsidian";
import Donut from "./components/Donut";
import { createDailyNotesStore, getYearData } from "./yearData";
import Header from "./components/Header";
import { AppContext } from "./contexts/AppContext";

export const DECADE_VIEW = "decade-view";

export class DecadeView extends ItemView {
	root: Root | null = null;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
		icon: "calendar-clock";
	}

	getViewType() {
		return DECADE_VIEW;
	}

	getDisplayText() {
		return "Decade-View";
	}

	getIcon(): string {
		return "calendar-clock";
	}

	async onOpen() {
		this.registerEvent(
			this.app.workspace.on(
				"active-leaf-change",
				this.onActiveFileChange.bind(this)
			)
		);

		this.root = createRoot(this.containerEl.children[1]);

		this.renderView();
	}

	onActiveFileChange = debounce(() => {
		// console.log("active file changed");
		this.renderView();
	}, 300);

	renderView() {
		const years = createDailyNotesStore();
		const activeFile = this.app.workspace.getActiveFile();
		const donuts = [...years.entries()].map(([year, notes]) => {
			const yearData = getYearData(year, notes, activeFile);
			return <Donut key={year} year={year} data={yearData} />; // append the donut
		});

		this.root?.render(
			<StrictMode>
				<AppContext.Provider value={this.app}>
					<Header />
					<div style={{ paddingTop: "100px" }}>{donuts}</div>
				</AppContext.Provider>
			</StrictMode>
		);
	}

	async onClose() {
		if (this.root) {
			this.root.unmount(); // Unmount React components
			this.root = null; // Clean up the root reference
		}
	}
}
