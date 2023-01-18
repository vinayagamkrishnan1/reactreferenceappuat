import type { B2CConfiguration } from './b2cClient';
import {Platform} from 'react-native';

export const b2cConfig: B2CConfiguration = {
  auth: {
    clientId: 'd17a6484-950a-4969-8b54-b7bc8c0c9c7a',
    authorityBase: 'https://login.microsoftonline.com/5b973f99-77df-4beb-b27d-aa0c70b8482c',
    policies: {
      signInSignUp: 'B2C_1_SignInUp',
      passwordReset: 'B2C_1_PasswordReset',
    },
    redirectUri: Platform.OS === 'android'
      ? 'msauth://com.eygsl.cbs.reactreferenceappuat/pKLmhyA0HEMLOig6q6sLrvpEOUI%3D'
      : 'msauth.com.eygsl.cbs.reactreferenceappuat://auth'
  },
  // web only:
  cache: { cacheLocation: 'localStorage' },

  androidConfigOptions: {
    authorization_user_agent: "DEFAULT",

  }
};

export const b2cScopes = {
  endpoint: "https://graph.microsoft.com",
  // scopes: Platform.OS === 'android' ? ["user.read"] : ["User.read"],
  scopes: ["User.read"]
}
