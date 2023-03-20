import React, { useEffect } from 'react';
import { MainChat, MainChatInput, ManagerProfile, MainMailForm } from 'components';
import { useChatContext } from 'store';
import { SERVER_ID } from 'templates';
import 'styles/App.sass';

function App() {
    const { isMail, setServerId } = useChatContext();

    useEffect(() => {
        if (window !== window.parent) {
            getServerKey();
        } else {
            // for 'DEVELOPMENT' mode set as SERVER_ID
            console.log('🔑 SERVER_ID...', SERVER_ID);
            setServerId(SERVER_ID);
        }
        return () => {
            localStorage.clear();
        }
        // eslint-disable-next-line
    }, []);

    const getServerKey = () => {
        const serverKey = window.location.hash.substring(1);
        setServerId(serverKey);
        console.log('🔑 serverKey...', serverKey);
    }

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
