import React from 'react';
import { MainChat, MainChatInput } from 'components';
import 'styles/App.sass';

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
                <MainChat />
            </main>

            <footer className="App-footer">
                <MainChatInput />
            </footer>
        </div>
    );
}

export default App;
