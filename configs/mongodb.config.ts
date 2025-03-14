const dev = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 27017,
  name: process.env.DB_NAME || ''
}

const pro = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 27017,
  name: process.env.DB_NAME || ''
}

const mongoDBConfig = { dev, pro }
type Env = 'dev' | 'pro'
const env: Env = (process.env.NODE_ENV as Env) || 'dev'

export default mongoDBConfig[env]
