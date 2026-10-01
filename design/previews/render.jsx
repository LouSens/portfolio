// Renders one concept design at a fixed size so Playwright can screenshot it to an image.
// Usage: /design/previews/render.html?c=neuralvoid&view=dashboard   (see design/README.md)
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../src/index.css';
import NeuralVoidPreview, { NeuralVoidPoster } from './NeuralVoidPreview';
import LegalRagPreview, { LegalRagPoster } from './LegalRagPreview';

const params = new URLSearchParams(window.location.search);
const c = params.get('c');
const view = params.get('view') || undefined;

const poster = (Poster) => (
  <div id="stage" style={{ width: 410, height: 540, position: 'relative' }}>
    <Poster />
  </div>
);
const screen = (Preview) => (
  <div id="stage" style={{ width: 960 }}>
    <Preview view={view} />
  </div>
);

const views = {
  neuralvoid: () => screen(NeuralVoidPreview),
  'neuralvoid-poster': () => poster(NeuralVoidPoster),
  'legal-rag': () => screen(LegalRagPreview),
  'legal-rag-poster': () => poster(LegalRagPoster),
};

createRoot(document.getElementById('root')).render((views[c] || views.neuralvoid)());
