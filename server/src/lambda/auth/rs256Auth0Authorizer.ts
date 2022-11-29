
import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

import { verify } from 'jsonwebtoken'
import { JwtToken } from '../../auth/JwtToken'

const cert = `...`
// const cert = `-----BEGIN CERTIFICATE-----
// MIIDHTCCAgWgAwIBAgIJbph65RzJheqNMA0GCSqGSIb3DQEBCwUAMCwxKjAoBgNV
// BAMTIWRldi1weW1vaWhtcTByazZueGd4LnVzLmF1dGgwLmNvbTAeFw0yMjExMjkw
// NzE4MDhaFw0zNjA4MDcwNzE4MDhaMCwxKjAoBgNVBAMTIWRldi1weW1vaWhtcTBy
// azZueGd4LnVzLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
// ggEBAJ90VXGYM7D5Otf2J453thB1IL1/aglyDuSDwQ9Dmq8bv/tDbMUpyIhnMLIq
// Urkb+YIa69FgMgJRcYo/NLNeFvYfwqG4Qzs62pbW1wh1+YcjPxZvcqJkdjWJd1UP
// sXxEgUinHfH43/V8N93X9qlKa3GkrpU1xDffvLWAkNbGpMjio2qPjl5wXP22TZ5+
// t8xdMSCcJx1gH16LDsIemWDnrl7bq0RmxUxbb12unLyTE6AzADPSI/wXXjFPQ1Jx
// r3rOk6CEYSlG3bdS4Xv9IVQnSdL2zFcOcUGuESQtPbkDIxaht+Ei0P8/rPIBAnkA
// sXHA26GuY1FE/fE3ILEP9FalnasCAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAd
// BgNVHQ4EFgQUFkx0DjM0RHbLDzsXp6Yd/TaavQAwDgYDVR0PAQH/BAQDAgKEMA0G
// CSqGSIb3DQEBCwUAA4IBAQAgdEXHxZVV/zCENDGntCB7RYdywwCy5OBTL6IH39Pw
// 5Lp1WhRf4wG5QSO3y9PgjXD1B00EzgB8HX95JNPS1DyJeye0m4tphE+nYsGXcAA4
// tWV+D/oBQhkrL1OnUmAv6TFYaDkX2zjji7XIypa4u0NXMmakpuWHlPAW6va9+5Y9
// /Nm8HS2YAXxyIzirJrUZhl+pQ8GUsYseu+NAvuJ4GVsHNmlA+Pnsa+5JSlB4m5+h
// 8pjMO8ur5uRgwhHKOKivsWd5ka4QsSVrII9t6VG7hyvNezAkJUygKIIvcIozTrzt
// bvZAJdANxM58cTs4BweGaiab5lZ8qFkUb3ZI+tM+xdJN
// -----END CERTIFICATE-----`

export const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  try {
    const jwtToken = verifyToken(event.authorizationToken)
    console.log('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    console.log('User authorized', e.message)

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

function verifyToken(authHeader: string): JwtToken {
  if (!authHeader)
    throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return verify(token, cert, { algorithms: ['RS256'] }) as JwtToken
}
