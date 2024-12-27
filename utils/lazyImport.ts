import { lazy } from 'react';

export function lazyImport<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
) {
  return lazy(() => 
    importFn()
      .then(module => ({ default: module.default }))
      .catch(error => {
        console.error('Error loading component:', error);
        return { default: fallback || (() => null) };
      })
  );
}