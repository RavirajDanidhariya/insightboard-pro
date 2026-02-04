import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

export interface MetricCardProps {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  icon,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div>{value}</div>
        <div>{description}</div>
      </CardContent>
    </Card>
  )
}

export default MetricCard
