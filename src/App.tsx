import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from './components/ui/card'
import { Button } from './components/ui/button'

const App = () => {
  const [count, setCount] = useState(1)

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>InsightBoard Pro</CardHeader>
        <CardDescription>Anaytics dashboard powerd by React</CardDescription>
        <CardContent>
          <p className="mb-4">shadcn/ui components</p>
          <Button>Get Started</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
