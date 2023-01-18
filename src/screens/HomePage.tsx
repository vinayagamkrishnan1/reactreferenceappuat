import React, { useEffect, useState } from 'react';
import { View, Platform, NativeModules, Text, Button, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { B2CClient } from '../MSALAuth/config/b2cClient';
import { b2cConfig, b2cScopes } from '../MSALAuth/config/msalConfig';
import { getItem, clearStorage, setItem } from '../utils/StorageHelper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { initialToken } from '../services/IntuneServices';
// import { initSDK } from '../services/GraphClient';

const b2cClient = new B2CClient(b2cConfig);

export const HomePage = () => {

  const [ response, setResponse ] = useState<any>({});
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ username, setUsername ] = useState<string>("");

  const webviewParameters = {
    ios_prefersEphemeralWebBrowserSession: Platform.OS === 'ios',
  };

  useEffect(() => {
    async function init() {
      setLoading(true);
      try {
        const msalresponse = await initialToken();
        console.log("MSAL RESPONSE>>>>", JSON.stringify(msalresponse));
        console.log("???????????????????????", msalresponse?.idToken);
        setItem("username", msalresponse?.account.username);
        setItem("accessToken", msalresponse?.accessToken);
        setItem("idToken", msalresponse?.idToken);
        setResponse(msalresponse?.account);
        setUsername(msalresponse?.account.username);
        setLoading(false);
      } catch (error: any) {
        console.log("Error while login>>>>", error);
        setLoading(false);
        Alert.alert("MSAL RESPONSE>>>>error" + JSON.stringify(error));
      }
    }
    init();
  }, []);


  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <View
        style={{
          justifyContent: 'center',
          margin: 10,
          alignItems: 'center'
        }}
      >

        {/* <WebView
          source={{ uri: 'https://google.com/'}}
        /> */}

        {(!loading && username) &&
          <View>
            <Text>Welcome {username}</Text>
          </View>
        }
        
        {(!loading && !username) &&
          <View>
            <Text>Something went wrong please try again later.</Text>
          </View>
        }

        {/* <TouchableOpacity>
          <Button
            onPress={getSilientToken}
            title="Set Token Manually"
          />
        </TouchableOpacity> */}

      </View>
    </SafeAreaView>
  );
};