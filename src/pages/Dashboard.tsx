import MetricCard, { MetricCardProps } from '@/components/common/MetricCard'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { DollarSign, ShoppingCart, TrendingUp, Users } from 'lucide-react'
import { lazy, Suspense } from 'react'

const DashboardCharts = lazy(() => import('./DashboardCharts'))

interface DashboardMetric extends MetricCardProps {
  id: string
}

const metricItems: DashboardMetric[] = [
  {
    title: 'Total Revenue',
    value: '$45,231',
    description: '+20.1% from last month',
    icon: <DollarSign className="h-4 w-4 text-slate-600" />,
    id: 'totalRevenue',
  },
  {
    title: 'Active Users',
    value: '2,350',
    description: '+15% from last month',
    icon: <Users className="h-4 w-4 text-slate-600" />,
    id: 'activeUsers',
  },
  {
    title: 'Sales',
    value: '12,234',
    description: '+8% from last month',
    icon: <ShoppingCart className="h-4 w-4 text-slate-600" />,
    id: 'sales',
  },
  {
    title: 'Growth',
    value: '23.5%',
    description: '+4.2% from last month',
    icon: <TrendingUp className="h-4 w-4 text-slate-600" />,
    id: 'growth',
  },
]

const ChartLoader = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[1, 2].map(i => {
        return (
          <Card key={i}>
            <CardHeader>
              <div className="h-6 bg-slate-200 rounded w-1/3 animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded w-1/3 animate-pulse mt-2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] bg-slate-100 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard Screen</h1>
        <p className="text-slate-600 mt-2">
          Welcome to your analytic dashboard
        </p>
      </div>
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {metricItems.map(({ id, title, value, description, icon }) => {
          return (
            <MetricCard
              key={id}
              title={title}
              value={value}
              description={description}
              icon={icon}
            />
          )
        })}
      </div>

      {/* Charts */}
      <Suspense fallback={<ChartLoader />}>
        <DashboardCharts />
      </Suspense>
    </div>
  )
}

export default Dashboard
