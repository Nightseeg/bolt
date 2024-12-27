import React, { Suspense } from 'react';
import Loading from '@/components/Loading';

export function loadable<T extends React.ComponentType<any>>(
  Component: React.LazyExoticComponent<T>
) {
  return function LoadableComponent(props: React.ComponentProps<T>) {
    return (
      <Suspense fallback={<Loading />}>
        <Component {...props} />
      </Suspense>
    );
  };
}