import { IApiKey } from '@interfaces/apikey.interface.js'
import { IKeyToken } from '@interfaces/keytoken.interface.js'
import { Request } from 'express'

export interface CustomRequest extends Request {
  objectKey?: IApiKey
  keyStore?: IKeyToken
}
