import React, { useEffect } from 'react';
import { MainChat, MainChatInput, ManagerProfile } from 'components';
import 'styles/App.sass';

function App() {

    useEffect(() => {
        return () => {
            localStorage.clear();
        }
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <div className="App-link">
                    <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        tebox &copy;
                    </a>
                </div>
                <div className="App-profile">
                    <ManagerProfile />
                </div>
                <div>
                    <span></span>
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
