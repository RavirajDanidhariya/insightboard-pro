export interface SalesData {
  id: string
  customer: string
  product: string
  amount: number
  status: 'completed' | 'pending' | 'cancelled'
  date: string
  region: string
}

export function generateMockData(count: number): SalesData[] {
  const customers = [
    'Acme corp',
    'Tech Solutions',
    'Global Industries',
    'Smart Systems',
    'Digital Ventures',
  ]
  const products = [
    'Enterprise Plan',
    'Pro Plan',
    'Basic Plan',
    'Premium Support',
  ]
  const statuses: SalesData['status'][] = ['cancelled', 'completed', 'pending']

  const regions = ['North America', 'Europe', 'Asia', 'South Ametica', 'Africa']

  return Array.from({ length: count }, (_, i) => {
    return {
      id: `TXN-${String(i + 1).padStart(6, '0')}`,
      customer: customers[Math.floor(Math.random() * customers.length)],
      product: products[Math.floor(Math.random() * products.length)],
      amount: Math.floor(Math.random() * 10000) + 100,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      region: regions[Math.floor(Math.random() * regions.length)],
      date: new Date(
        2024,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      )
        .toISOString()
        .split('T')[0],
    }
  })
}
