import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const Dashboard = lazy(() => import('@/pages/Dashboard'))
const DataExplorer = lazy(() => import('@/pages/DataExplorer'))

const ExportCenter = lazy(() => import('@/pages/ExportCenter'))

const AIInsight = lazy(() => import('@/pages/AIInsight'))
const PreferredSettings = lazy(() => import('@/pages/PreferredSettings'))

export const APP_ROUTES = {
  baseUrl: '/',
  dataExplorer: '/dataexplorer',
  aiInsight: '/aiinsight',
  exportCenter: '/exportcenter',
  settings: '/settings',
} as const

const AppRoutes = () => {
  return (
    <div className="mt-4">
      <Routes>
        <Route
          path={APP_ROUTES.baseUrl}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path={APP_ROUTES.dataExplorer}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <DataExplorer />
            </Suspense>
          }
        />
        <Route
          path={APP_ROUTES.aiInsight}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AIInsight />
            </Suspense>
          }
        />
        <Route
          path={APP_ROUTES.exportCenter}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ExportCenter />
            </Suspense>
          }
        />
        <Route
          path={APP_ROUTES.settings}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PreferredSettings />
            </Suspense>
          }
        />
      </Routes>
    </div>
  )
}

export default AppRoutes
