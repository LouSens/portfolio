import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

/* Lift the name screen once the app is on screen, the fonts are in, and the name has been seen for a beat. */
const splash = document.getElementById('splash');
if (splash) {
  const shown = performance.now();
  const ready = Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((r) => setTimeout(r, 1500))]);
  ready.then(() => {
    const wait = Math.max(0, 1100 - (performance.now() - shown));
    setTimeout(() => {
      requestAnimationFrame(() => {
        splash.classList.add('out');
        setTimeout(() => splash.remove(), 1000);
      });
    }, wait);
  });
}
