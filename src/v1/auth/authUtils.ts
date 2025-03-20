import JWT from 'jsonwebtoken'

export const createTokensPair = ({
  payload,
  accessTokenKey,
  refreshTokenKey
}: {
  payload: any
  accessTokenKey: string
  refreshTokenKey: string
}) => {
  const accessToken = JWT.sign(payload, accessTokenKey, { expiresIn: '2 days' })
  const refreshToken = JWT.sign(payload, refreshTokenKey, { expiresIn: '7 days' })

  return { accessToken, refreshToken }
}
