import { env } from '../env'
import { app } from './app'

const port = env.PORT || 3000
app.listen(port, () => {
  const host = 'RENDER' in process.env ? '0.0.0.0' : 'localhost'
  console.log(`🚀 HTTP server running on ${host}:${port}`)
})
