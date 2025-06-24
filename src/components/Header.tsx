import { useApp } from '../contexts/AppContext';

export default function Header() {
    const app = useApp();

    const background = "var(--color-base-30)";

    return (
        <div style={{
            position: 'fixed',
            width: '100%',
        }}>
            <header style={{
                top: 0,
                left: 0,
                margin: 0,
                backgroundColor: background,
                padding: '1em',
            }}>
                <button onClick={() => {
                    window.focus();
                    (app as any)?.commands.executeCommandById('daily-notes:goto-next')
                    console.log(this.app);
                    console.log((app as any)?.commands.listCommands());

                }}
                >Next Note</button>
            </header>
        </div>
    )
}