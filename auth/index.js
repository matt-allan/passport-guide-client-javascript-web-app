import { AuthorizationServiceConfiguration } from '@openid/appauth/built/authorization_service_configuration'
import { AuthorizationRequest } from '@openid/appauth/built/authorization_request'
import { RedirectRequestHandler } from '@openid/appauth/built/redirect_based_handler'
import { AuthorizationNotifier } from '@openid/appauth/built/authorization_request_handler'
import { BasicQueryStringUtils } from '@openid/appauth/built/query_string_utils'
import { BaseTokenRequestHandler } from '@openid/appauth/built/token_request_handler'
import {
  GRANT_TYPE_AUTHORIZATION_CODE,
  TokenRequest
} from '@openid/appauth/built/token_request'
import { FetchRequestor } from '@openid/appauth/built/xhr'

class NoHashQueryStringUtils extends BasicQueryStringUtils {
  parse(input, useHash) {
    // never use hash
    return super.parse(input)
  }
}

export class Auth {
  constructor() {
    this.configuration = new AuthorizationServiceConfiguration({
      authorization_endpoint: `${process.env.PASSPORT_URL}/oauth/authorize`,
      token_endpoint: `${process.env.PASSPORT_URL}/oauth/token`
    })

    this.notifier = new AuthorizationNotifier()

    this.authorizationHandler = new RedirectRequestHandler(
      undefined,
      new NoHashQueryStringUtils()
    )

    this.authorizationHandler.setAuthorizationNotifier(this.notifier)

    this.tokenHandler = new BaseTokenRequestHandler(new FetchRequestor())
  }

  makeAuthorizationRequest() {
    const request = new AuthorizationRequest({
      client_id: process.env.PASSPORT_CLIENT_ID,
      redirect_uri: `${process.env.BASE_URL}/login/callback`,
      scope: '',
      response_type: AuthorizationRequest.RESPONSE_TYPE_CODE
    })

    this.authorizationHandler.performAuthorizationRequest(
      this.configuration,
      request
    )
  }

  completeAuthorizationRequest() {
    return new Promise((resolve, reject) => {
      this.notifier.setAuthorizationListener((request, response, error) => {
        if (error) {
          reject(error)
        }

        if (response) {
          const code = response.code

          const extras = {}
          if (request.internal && request.internal.code_verifier) {
            extras.code_verifier = request.internal.code_verifier
          }
          this.makeAuthCodeTokenRequest(code, extras).then((response) => {
            resolve(response)
          })
        }
      })

      this.authorizationHandler.completeAuthorizationRequestIfPossible()
    })
  }

  makeAuthCodeTokenRequest(code, extras) {
    const tokenRequest = new TokenRequest({
      client_id: process.env.PASSPORT_CLIENT_ID,
      redirect_uri: `${process.env.BASE_URL}/login/callback`,
      grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
      code,
      refresh_token: undefined,
      extras
    })

    return this.tokenHandler.performTokenRequest(
      this.configuration,
      tokenRequest
    )
  }
}
