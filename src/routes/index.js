import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Reports = lazy(() => import('../pages/FilteredProcedures'));
const Operators = lazy(() => import('../pages/Operators'))
const Page404 = lazy(() => import('../pages/404'));
const Machines = lazy(() => import('../pages/Machines'));
const productionLines = lazy(() => import('../pages/ProductionLines'));

const routes = [
  // {
  //   path: '/dashboard',
  //   component: Dashboard,
  // },
  // {
  //   path: '/reports',
  //   component: Reports,
  // },
  {
    path: '/operators',
    component: Operators,
  },
  {
    path: '/machines',
    component: Machines
  },
  {
    path: '/productionLines',
    component: productionLines
  },
  {
    path: '/404',
    component: Page404,
  }
]

export default routes
