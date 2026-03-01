import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import PricingPage from './pages/PricingPage';
import DocsPage from './pages/DocsPage';
import CalendarPage from './pages/CalendarPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PublicDatasetsPage from './pages/PublicDatasetsPage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import ApiKeysPage from './pages/dashboard/ApiKeysPage';
import BillingPage from './pages/dashboard/BillingPage';
import BillingSuccessPage from './pages/dashboard/BillingSuccessPage';
import DatasetsPage from './pages/dashboard/DatasetsPage';
import VideoUploadPage from './pages/dashboard/VideoUploadPage';

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
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'datasets',
        element: <PublicDatasetsPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'keys',
        element: <ApiKeysPage />,
      },
      {
        path: 'billing',
        element: <BillingPage />,
      },
      {
        path: 'billing/success',
        element: <BillingSuccessPage />,
      },
      {
        path: 'datasets',
        element: <DatasetsPage />,
      },
      {
        path: 'docs',
        element: <DocsPage />,
      },
      {
        path: 'video-upload',
        element: <VideoUploadPage />,
      },
    ],
  },
]);

export default router;
