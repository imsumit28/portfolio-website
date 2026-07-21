import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App.jsx';

/**
 * Build-time render of a single route to an HTML string.
 *
 * Consumed by scripts/prerender.js. Nothing here runs in the browser — the
 * shipped bundle boots through main.jsx with BrowserRouter instead.
 */
export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
