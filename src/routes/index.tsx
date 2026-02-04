import AIInsight from '@/pages/AIInsight'
import Dashboard from '@/pages/Dashboard'
import DataExplorer from '@/pages/DataExplorer'
import ExportCenter from '@/pages/ExportCenter'
import PreferredSettings from '@/pages/PreferredSettings'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

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
        <Route path={APP_ROUTES.baseUrl} element={<Dashboard />} />
        <Route path={APP_ROUTES.dataExplorer} element={<DataExplorer />} />
        <Route path={APP_ROUTES.aiInsight} element={<AIInsight />} />
        <Route path={APP_ROUTES.exportCenter} element={<ExportCenter />} />
        <Route path={APP_ROUTES.settings} element={<PreferredSettings />} />
      </Routes>
    </div>
  )
}

export default AppRoutes
