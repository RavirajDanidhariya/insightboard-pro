import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import AppSidebar from './layout/AppSidebar'

const App = () => {
  return (
    <BrowserRouter>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarTrigger className="mb-4" />
        <main className="w-full p-8">
          <AppRoutes />
        </main>
      </SidebarProvider>
    </BrowserRouter>
  )
}

export default App
