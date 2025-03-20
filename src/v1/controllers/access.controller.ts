import AccessService from '@services/access.service.js'
import { NextFunction, Request, Response } from 'express'

class AccessController {
  signUp = async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await AccessService.signUp(req.body)

    res.status(201).json(newUser)
  }
}

export default new AccessController()
