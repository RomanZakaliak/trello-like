import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app.component.tsx';
import './index.css';

import './common/utils/i18.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback="Loading...">
      <App />
    </Suspense>
  </StrictMode>
);
