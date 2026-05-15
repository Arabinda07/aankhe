import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

let root: Root | null = null;

export function mountApp() {
  if (root) return;

  const container = document.getElementById('root');
  if (!container) return;

  root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

mountApp();
