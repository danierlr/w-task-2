import express from 'express'

const port = process.env.PORT
const dbUrl = process.env.DATABASE_URL

console.log('start')

const app = express()
const PORT = 80

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.get('/', (req: any, res: any) => {
  res.json({ message: 'Welcome to the Express server!' })
})

app.get('/api/health', (req: any, res: any) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// 404 handler
app.use((req: any, res: any) => {
  res.status(404).json({ error: 'Route not found' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

console.log('end')
