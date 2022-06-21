import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './App';
import './index.scss';

import { worker } from './app/SocialMediaFeed/api/server'

// Wrap app rendering so we can wait for the mock API to initialize
async function start() {
    // Start our mock API server
    await worker.start({ onUnhandledRequest: 'bypass' })

    const root = ReactDOM.createRoot(document.getElementById("root"))
    root.render(
        <React.StrictMode>
            <MainApp/>
        </React.StrictMode>
    )
}
  
start()
