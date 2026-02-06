import { MetricCardProps } from '@/components/common/MetricCard'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts'

const DashboardCharts = () => {
  const revenueData = [
    { month: 'Jan', revenue: 35000 },
    { month: 'Feb', revenue: 38000 },
    { month: 'Mar', revenue: 42000 },
    { month: 'Apr', revenue: 39000 },
    { month: 'May', revenue: 45000 },
    { month: 'Jun', revenue: 48000 },
    { month: 'Jul', revenue: 64000 },
    { month: 'Aug', revenue: 55000 },
    { month: 'Sep', revenue: 22000 },
    { month: 'Oct', revenue: 45000 },
    { month: 'Nov', revenue: 46000 },
    { month: 'Dec', revenue: 55000 },
  ]

  const regionData = [
    { region: 'North', sales: 3200 },
    { region: 'South', sales: 2800 },
    { region: 'East', sales: 3600 },
    { region: 'West', sales: 2600 },
  ]

  const chartConfig = {
    revenue: {
      label: 'Revenue',
      color: 'hsl(var(--chart-1))',
    },
    sales: {
      label: 'Sales',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>
            Monthly Revenue for the last 12 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray={'3 3'} vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={value => `${value / 1000}k`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type={'monotone'}
                dataKey={'revenue'}
                stroke="var(--color-revenue)"
                fill="var(--color-revenue)"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Sales by Region Chart */}

      <Card>
        <CardHeader>
          <CardTitle>Sales by Region</CardTitle>
          <CardDescription>Comparison of sales across regions</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart data={regionData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                className="h-[300px]"
              />
              <XAxis
                dataKey="region"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={value => `${value / 1000}k`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="sales"
                fill="var(--color-sales)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardCharts
