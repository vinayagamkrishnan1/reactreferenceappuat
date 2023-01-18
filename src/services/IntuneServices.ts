import {Platform, Alert} from 'react-native';
import PublicClientApplication from 'react-native-msal';
import AsyncStorage from '@react-native-community/async-storage';
// import Msintune from 'react-native-msintune';

const resourceUri = 'https://graph.microsoft.com/User.Read';
const clientId = 'd17a6484-950a-4969-8b54-b7bc8c0c9c7a';
const authority = 'https://login.microsoftonline.com/5b973f99-77df-4beb-b27d-aa0c70b8482c';

export const initialToken = async () => {
  const config = {
    auth: {
      clientId: clientId,
      authority: authority,
    },
  };
  const pca: any = new PublicClientApplication(config);
  try {
    await pca.init();
    try {
      console.log('pca', pca);
      console.log('PCAAccounts', await pca.getAccounts());
    } catch (error) {
      console.log('PCAAccounts Error', error);
    }
    if (pca.isInitialized) {
      try {
        const params = {
            scopes: Platform.OS === 'android' ? ["User.read"] : ["User.read"],
            authority:'https://login.microsoftonline.com/5b973f99-77df-4beb-b27d-aa0c70b8482c',
        };
        const result = await pca.acquireToken(params);
        console.log('result>>>>>>', result);
        // try {
        //   Msintune.initializeInTuneSDK(
        //     result.account.identifier,
        //     clientId,
        //     result.tenantId,
        //     result.accessToken,
        //     (res) => {
        //       console.log('Msintune success');
        //     },
        //     (err) => {
        //       console.log('Msintune failed', err.message);
        //     },
        //   );
        //   setAuthDetails(authDetails);
        //   await SetStoreData(IS_USER_LOGGEDIN, 'yes');
        //   return authDetails;
        // } catch (err) {
        //   // pca.signOut();
        // }
        // return authDetails;
        return result;
      } catch (err) {
        console.log('React Reference App', err);
        // pca.signOut();
      }
    }
  } catch (err) {
    console.log('React Reference App???????', '' + err);
    // pca.signOut();
  }
};

const azureLoginFn = async () => {
  const setUseBroker = true;
  const redirectUri = Platform.OS === 'android' ? 'msauth://com.eygsl.cbs.reactreferenceappuat/pKLmhyA0HEMLOig6q6sLrvpEOUI%3D' : 'msauth.com.eygsl.cbs.reactreferenceappuat://auth';
  const config = {
    auth: {
      clientId: clientId,
      authority: authority,
    },
  };

  const pca: any = new PublicClientApplication(config);
  try {
    await pca.init();
    if (pca.isInitialized) {
      const accountIdentifier = await AsyncStorage.getItem('IS_USER_LOGGEDIN');
      if (accountIdentifier == null) {
        return initialToken();
      } else {
        // already logged in user
        try {
          // const account = JSON.parse(accountIdentifier);
          const accounts = await pca.getAccounts();
          console.log('account from api===', accounts);
          const params = {
            scopes: [`${resourceUri}AllSites.Manage`],
            // account: account,
            account: accounts[0],
            authority: authority,
          };
          const result = await pca.acquireTokenSilent(params);
          const paramsGraphAPI = {
            scopes: ['https://graph.microsoft.com/User.Read'],
            // account: account,
            account: accounts[0],
            authority: authority,
          };
          const resultGraphAPI = await pca.acquireTokenSilent(paramsGraphAPI);
          return resultGraphAPI;
        } catch (err) {
          // acquireTokenSilent failed
          console.log('err2', err);
          pca.signOut();
          await AsyncStorage.clear();
          try {
            return initialToken();
          } catch (error) {
            console.log('error clean cache', error);
            return initialToken();
          }
        }
      }
    } else {
      Alert.alert('React Reference app', 'Initialization failed');
    }
  } catch (error) {
    Alert.alert('React Reference app', 'Token aquireError' + error);
  }
};

// export const checkAndSaveAuthToken = async () => {
//   try {
//       azureLoginFn().then(data => {
//         console.log('refreshed token', data);
//         const value = new AzureObject(data);
//         return value;
//       });
//   } catch (err) {
//     return false;
//   }
// };
