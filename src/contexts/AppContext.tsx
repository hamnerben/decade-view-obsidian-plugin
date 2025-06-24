import { createContext, useContext } from 'react';
import { App } from 'obsidian';

export const AppContext = createContext<App | undefined>(undefined);

export const useApp = (): App => {
	const app = useContext(AppContext);
	if (!app) {
		throw new Error("useApp must be used within an AppContext.Provider");
	}
	return app;
};
