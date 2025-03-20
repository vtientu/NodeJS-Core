import { IApiKey } from '@interfaces/apikey.interface.js'
import { Request } from 'express'

export interface CustomRequest extends Request {
  objectKey?: IApiKey
}
