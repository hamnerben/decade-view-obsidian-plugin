
export default function Header() {

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
            <h1 style={{
            }}>Decade View</h1>
        </header>
        </div>
    )
}