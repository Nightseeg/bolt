import { lazy } from 'react';

export function createChunkLoader<T>(
  importFn: () => Promise<{ default: T }>,
  chunkName: string
) {
  return lazy(() => 
    importFn()
      .then(module => ({ default: module.default }))
      .catch(error => {
        console.error(`Error loading chunk ${chunkName}:`, error);
        throw error; // Re-throw to trigger error boundary
      })
  );
}