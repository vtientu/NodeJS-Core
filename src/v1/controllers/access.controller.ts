import { CREATED, OK } from '@core/success.response.js'
import { CustomRequest } from '@interfaces/request.interface.js'
import AccessService from '@services/access.service.js'
import { NextFunction, Request, Response } from 'express'

class AccessController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    new OK({
      message: 'Login successfully!',
      metadata: await AccessService.login(req.body)
    }).send(res)
  }

  public static async signUp(req: Request, res: Response, next: NextFunction) {
    new CREATED({
      message: 'Sign up successfully!',
      metadata: await AccessService.signUp(req.body)
    }).send(res)
  }

  public static async logout(req: CustomRequest, res: Response, next: NextFunction) {
    new OK({
      message: 'Logout successfully!',
      metadata: await AccessService.logout(req.keyStore)
    }).send(res)
  }

  public static async refreshToken(req: Request, res: Response, next: NextFunction) {
    new OK({
      message: 'Refresh success!',
      metadata: await AccessService.handleRefreshToken(req.headers.authorization)
    }).send(res)
  }
}

export default AccessController
