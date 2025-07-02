import { createContext, useContext } from 'react';
import { App, WorkspaceLeaf } from 'obsidian';

export const AppContext = createContext<{
	app: App;
	lastMarkdownLeaf: WorkspaceLeaf | null;
} | undefined>(undefined);

export const useApp = (): { app: App; lastMarkdownLeaf: WorkspaceLeaf | null } => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useApp must be used within an AppContext.Provider");
	}
	return context;
};
