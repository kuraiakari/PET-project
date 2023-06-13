import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_TOKEN } from '../config'

export const GenerateSalt = async () => {
  return await bcryptjs.genSalt()
}
// mã khóa password và lưu trữ chuỗi đã đc mã khóa  
export const GeneratePassword = async (password: string, salt: string) => {
  return await bcryptjs.hash(password, salt)
}

// mã khóa value input password and compare with string đã mã khóa
export const ValidatePassword = async (inputPassword: any, password: any, salt: any) => {
  return (await GeneratePassword(inputPassword, salt)) === password
}

export const GenerateSignature = async (payload: any) => {
  return await jwt.sign(payload, JWT_TOKEN as string, { expiresIn: '10m' })
}

export const GenerateSignatureRefresh = async ({timeLeft, ...payload}: any) => {
  // console.log(timeLeft, payload)
  // console.log(timeLeft)
  return await jwt.sign(payload, JWT_TOKEN as string, { expiresIn: timeLeft })
}

export const ValidateSignature = async (req: any) => {
  const signature = req.get('Authorization')
  if (signature) {
    return jwt.verify(signature.split(' ')[1], JWT_TOKEN as string)
  }
  return undefined
}
