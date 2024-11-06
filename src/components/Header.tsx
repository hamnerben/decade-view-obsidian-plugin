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
            padding: '1em',  }}>
            <button onClick={() => {
                const commandtoExecute =  () => {app?.commands.executeCommandById('daily-notes:goto-next')}
                commandtoExecute();
                console.log(commandtoExecute());
                
            }}
            >Next Note</button>
        </header>
        </div>
    )
}