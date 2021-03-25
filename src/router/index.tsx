import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { History } from 'history';
import UniversalRouter, { Routes } from 'universal-router';

function useLocation(history: History<any>) {
  const [location, setLocation] = useState(history.location);
  useEffect(
    () => {
      const unlisten = history.listen(({ location }) => setLocation(location));
      return () => unlisten();
    },
    [history],
  );
  return location;
}

function useRouter(
  routes: Routes<any, { default: React.ComponentType }>,
  history: History<any>,
) {
  const location = useLocation(history);
  const router = useMemo(() => new UniversalRouter(routes), [routes]);
  const [Component, setComponent] = useState<React.ReactType>('div');

  useEffect(
    () => {
      const LazyComponent = React.lazy(() => router.resolve(location.pathname));
      setComponent(() => LazyComponent);
    },
    [location, router],
  );

  return Component;
}

interface Props {
  routes: Routes<any, { default: React.ComponentType }>;
  history: History;
  fallback: NonNullable<React.ReactNode> | null;
}

export function Router(props: Props) {
  const Component = useRouter(props.routes, props.history);
  return (
    <React.Suspense fallback={props.fallback}>
      <Component />
    </React.Suspense>
  );
}
