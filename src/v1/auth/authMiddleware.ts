import { HEADER } from '@constants/app.constants.js'
import { ForbiddenError } from '@core/error.response.js'
import { CustomRequest } from '@interfaces/request.interface.js'
import ApiKeyRepository from '@repositories/apikey.repository.js'
import { NextFunction, Response } from 'express'

const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const key = req.headers[HEADER.API_KEY]?.toString()

  if (!key) {
    throw new ForbiddenError()
  }

  const objectKey = await ApiKeyRepository.findKeyActiveByKey(key)

  if (!objectKey) {
    throw new ForbiddenError()
  }

  req.objectKey = objectKey

  next()
}

export default authMiddleware
