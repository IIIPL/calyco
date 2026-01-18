import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import ErrorBoundary from './components/ErrorBoundary';

const registerChunkRecovery = () => {
  const reloadKey = 'calyco:chunk-reload';
  const shouldReload = () => {
    if (sessionStorage.getItem(reloadKey)) {
      return false;
    }
    sessionStorage.setItem(reloadKey, '1');
    return true;
  };

  const triggerReload = () => {
    if (shouldReload()) {
      window.location.reload();
    }
  };

  window.addEventListener('error', (event) => {
    const target = event?.target;
    const isScript = target?.tagName === 'SCRIPT' && target?.src;
    const isChunk = isScript && target.src.includes('/assets/');
    if (isChunk) {
      triggerReload();
    }
  }, true);

  window.addEventListener('unhandledrejection', (event) => {
    const message = String(event?.reason?.message || event?.reason || '');
    if (
      message.includes('Failed to fetch dynamically imported module') ||
      message.includes('Loading chunk') ||
      message.includes('imported module')
    ) {
      triggerReload();
    }
  });
};

registerChunkRecovery();

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <BrowserRouter>
      <StrictMode>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </StrictMode>
    </BrowserRouter>
  </ErrorBoundary>
)
