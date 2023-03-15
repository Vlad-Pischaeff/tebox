import React, { useEffect } from 'react';
import { MainChat, MainChatInput, ManagerProfile, MainMailForm } from 'components';
import { useChatContext } from 'store';
import 'styles/App.sass';

function App() {
    const { isMail } = useChatContext();

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
                <div className={isMail ? 'full' : 'hidden'}>
                    <MainMailForm />
                </div>
                <div className={isMail ? 'hidden' : 'full'}>
                    <MainChat />
                </div>
            </main>
                <footer className={isMail ? 'hidden' : 'App-footer'}>
                    <MainChatInput />
                </footer>
        </div>
    );
}

export default App;
