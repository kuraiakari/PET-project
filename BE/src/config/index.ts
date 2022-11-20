import dotEnv from 'dotEnv'

if (process.env.NODE_ENV !== 'prod') {
  const configFile = `./.env`
  dotEnv.config({ path: configFile })
} else {
  dotEnv.config()
}

export const PORT = process.env.PORT
export const MONGODB_URL = process.env.MONGODB_URL
