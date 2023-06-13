import { JwtPayload } from 'jsonwebtoken'
import { ValidateSignature } from '../../utils'

export const verifyAdmin = async (req: any, res: any, next: any) => {
  try {
    const isAuthorized = await ValidateSignature(req)
    if (!isAuthorized) {
      return res.status(401).json({ message: 'You are not authenticated!' })
    } else {
      req.user = isAuthorized
      if ((isAuthorized as JwtPayload).isAdmin) {
        next()
      } else return res.status(403).json({ message: 'You are not authorized!' })
    }
  } catch (err) {
    res.json({ messageError: 'Expired access token' })
  }
}
export const verifyUser = async (req: any, res: any, next: any) => {
  try {
    const isAuthorized = await ValidateSignature(req)
    if (!isAuthorized) {
      return res.status(401).json({ message: 'You are not authenticated!' })
    } else {
      req.user = isAuthorized
      if ((isAuthorized as JwtPayload).isAdmin || (isAuthorized as JwtPayload)._id) {
        next()
      } else return res.status(403).json({ message: 'You are not authorized!' })
    }
  } catch (err) {
    res.json({ messageError: 'Expired access token' })
  }
}
export const verifyNewToken = async (req: any, res: any, next: any) => {
  try {
    const isAuthorized = await ValidateSignature(req)
    if (!isAuthorized) {
      return res.status(401).json({ message: 'You are not authenticated!' })
    } else {
      req.user = isAuthorized
      if ((isAuthorized as JwtPayload).isAdmin || (isAuthorized as JwtPayload)._id) {
        next()
      } else return res.status(403).json({ message: 'You are not authorized!' })
    }
  } catch (err) {
    res.json({ messageError: 'Expired access token' })
  }
}
