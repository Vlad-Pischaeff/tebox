import React from 'react';
import './App.sass';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div className="App-link">
                    <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        tebox &copy;
                    </a>
                </div>
                <div className="App-profile">
                    profile
                </div>
                <div className="App-service">
                    service menu
                </div>
            </header>
            <main className="App-main">
                Main chat...
            </main>
            <footer className="App-footer">
                footer
            </footer>
        </div>
    );
}

export default App;
