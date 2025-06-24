import { useApp } from '../contexts/AppContext';

export default function Header() {
    const app = useApp();

    const background = "var(--color-base-30)";

    return (
        <div style={{
            position: 'fixed',
        }}>
            <header style={{
                top: 0,
                left: 0,
                margin: 0,
                backgroundColor: background,
                padding: '1em',
            }}>
                <button 
                style={{ marginRight: '1em' }}
                onClick={() => {
                    window.focus();
                    const leaf = app.workspace.getLeavesOfType('markdown')?.[0];
                    if (leaf) {
                    app.workspace.setActiveLeaf(leaf, { focus: true });
                    (app as any).commands.executeCommandById('daily-notes:goto-prev');
                    } else {   
                    (app as any).commands.executeCommandById('daily-notes');
                    }
                }}
                >←</button>

                <button onClick={() => {
                    window.focus();
                    const leaf = app.workspace.getLeavesOfType('markdown')?.[0];
                    if (leaf) {
                    app.workspace.setActiveLeaf(leaf, { focus: true });
                    (app as any).commands.executeCommandById('daily-notes:goto-next');
                    } else {   
                    (app as any).commands.executeCommandById('daily-notes');
                    }
                }}
                >→</button>

            </header>
        </div>
    )
}