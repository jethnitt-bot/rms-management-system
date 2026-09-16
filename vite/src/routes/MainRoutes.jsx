import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import ProtectedRoute from './protectedRoute';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - color
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// 🟢 Import User Management Page
const UserManagement = Loadable(lazy(() => import('pages/userManagement')));

// 🟢 Import Categories Page
const Categories = Loadable(lazy(() => import('pages/categories')));

// 🟢 Import Menu Page
const MenuPage = Loadable(lazy(() => import('pages/menu')));

// table តុៗ
const TablesPage = Loadable(lazy(() => import('pages/tables')));

// 🟢 Import Reservations Page
const ReservationsPage = Loadable(lazy(() => import('pages/reservations')));

// 🟢 Import Logout Page
const Logout = Loadable(lazy(() => import('pages/Logout')));

// ============================== MAIN ROUTING ============================== //

const MainRoutes = {
  path: '/',
  element: <ProtectedRoute />,
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: '/',
          element: <DashboardDefault />
        },
        {
          path: 'dashboard',
          children: [
            {
              path: 'default',
              element: <DashboardDefault />
            }
          ]
        },
        {
          path: 'typography',
          element: <Typography />
        },
        {
          path: 'color',
          element: <Color />
        },
        {
          path: 'shadow',
          element: <Shadow />
        },
        {
          path: 'sample-page',
          element: <SamplePage />
        },
        {
          path: 'users',
          element: <UserManagement />
        },
        {
          path: 'categories',
          element: <Categories />
        },
        {
          path: 'menu',
          element: <MenuPage />
        },
        {
          path: 'tables',
          element: <TablesPage />
        },
        {
          path: 'reservations',
          element: <ReservationsPage />
        },
        // 🟢 Route សម្រាប់ Logout
        {
          path: 'logout',
          element: <Logout />
        }
      ]
    }
  ]
};

export default MainRoutes;