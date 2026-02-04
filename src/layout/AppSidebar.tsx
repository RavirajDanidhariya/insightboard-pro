import {
  BarChart3,
  Brain,
  ChevronLeft,
  Database,
  Download,
  Home,
  Settings,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../components/ui/sidebar'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { APP_ROUTES } from '@/routes'

const AppSidebar = () => {
  const sidebarMenuItems = [
    {
      linkTo: APP_ROUTES.baseUrl,
      text: 'Dashboard',
      icon: <Home />,
    },
    {
      linkTo: APP_ROUTES.dataExplorer,
      text: 'Data Explorer',
      icon: <Database />,
    },
    {
      linkTo: APP_ROUTES.aiInsight,
      text: 'AI Insights',
      icon: <Brain />,
    },
    {
      linkTo: APP_ROUTES.exportCenter,
      text: 'Export Center',
      icon: <Download />,
    },
    {
      linkTo: APP_ROUTES.settings,
      text: 'Settings',
      icon: <Settings />,
    },
  ]

  const { pathname } = useLocation()
  return (
    <Sidebar className="w-64">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-800 bg-clip-text text-transparent ">
            InsightBoard Pro
          </SidebarGroupLabel>
          <SidebarMenu>
            {/* menut item - 1 */}.
            {sidebarMenuItems.map(({ linkTo, icon, text }) => (
              <SidebarMenuItem key={linkTo}>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={linkTo}
                    className={
                      pathname === linkTo ? 'bg-slate-200 font-semibold' : ''
                    }
                  >
                    {icon}
                    <span>{text}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
