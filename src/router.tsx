import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import PricingPage from './pages/PricingPage';
import DocsPage from './pages/DocsPage';
import CalendarPage from './pages/CalendarPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'news',
        element: <NewsPage />,
      },
      {
        path: 'pricing',
        element: <PricingPage />,
      },
      {
        path: 'docs',
        element: <DocsPage />,
      },
      {
        path: 'calendar',
        element: <CalendarPage />,
      },
    ],
  },
]);

export default router;
