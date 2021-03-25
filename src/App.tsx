import { createHashHistory } from 'history';
import { Router } from './router';

import './App.css';

const history = createHashHistory();

export const routes = [
  {
    path: '/',
    action: () => import('./pages/main'),
  },
  {
    path: '/about',
    action: () => import('./pages/about'),
  },
];

function App() {
  return (
    <Router history={history} routes={routes} fallback={<div>Loading...</div>} />
  );
}

export default App;
