import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../../.env')
})

export const JWT_SECRET = process.env.SECRET || 'mysupersecret'
export const PORT = process.env.PORT || 3000
export const DATABASE =
  process.env.DATABASE_URL || 'postgres://USER:PASSWORD@localhost:5432/DATABASE'
export const NODE_ENV = process.env.NODE_ENV || 'development'
export const BUCKET_TYPE = process.env.BUCKET_TYPE || 'firebase'
