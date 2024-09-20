import { AppPage } from './routes/AppPage';
import { ErrorPage } from './routes/ErrorPage';
import { LogInPage } from './routes/LogInPage';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/', element: <AppPage />, errorElement: <ErrorPage /> },
  { path: '/login', element: <LogInPage />, errorElement: <ErrorPage /> },
]);

export { router };
