import { getTokenFromHeader } from '@auth/authUtils.js'
import { HEADER } from '@constants/app.constants.js'
import { ForbiddenError, NotFoundError, UnauthorizedError } from '@core/error.response.js'
import asyncHandler from '@helpers/asyncHandler.js'
import { CustomRequest } from '@interfaces/request.interface.js'
import ApiKeyRepository from '@repositories/apikey.repository.js'
import KeyTokenService from '@services/keyToken.service.js'
import { NextFunction, Response } from 'express'
import JWT from 'jsonwebtoken'

export const apiKey = async (req: CustomRequest, res: Response, next: NextFunction) => {
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

export const permission = (permission: string) => async (req: CustomRequest, res: Response, next: NextFunction) => {
  if (!req.objectKey?.permissions) {
    throw new ForbiddenError()
  }

  const isValidPermission = req.objectKey.permissions.includes(permission)

  if (!isValidPermission) {
    throw new ForbiddenError()
  }

  next()
}

export const authentication = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
  const userId = req.headers[HEADER.CLIENT_ID]?.toString()

  if (!userId) {
    throw new UnauthorizedError()
  }

  const keyStore = await KeyTokenService.findByUserId(userId)

  if (!keyStore) {
    throw new NotFoundError('Not Found Key Store')
  }

  const authHeader = req.headers.authorization

  const accessToken = getTokenFromHeader(authHeader)
  if (!accessToken) {
    throw new UnauthorizedError()
  }

  try {
    req.headers
    const decodeUser = JWT.verify(accessToken, keyStore.accessTokenKey) as JWT.JwtPayload
    if (userId !== decodeUser?._id) throw new UnauthorizedError('Invalid UserID')
    req.keyStore = keyStore
    next()
  } catch (error) {
    throw error
  }
})
