import { NextFunction, Request, Response } from 'express'

class AccessController {
  signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(201).json({})
    } catch (error) {
      next(error)
    }
  }
}

export default new AccessController()
