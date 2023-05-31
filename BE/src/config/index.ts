import dotEnv from 'dotenv'

if (process.env.NODE_ENV !== 'prod') {
  const configFile = `./.env`
  dotEnv.config({ path: configFile })
} else {
  dotEnv.config()
}

export const PORT_HTTP = process.env.PORT_HTTP
export const MONGODB_URL = process.env.MONGODB_URL
export const JWT_TOKEN = process.env.SECRET
