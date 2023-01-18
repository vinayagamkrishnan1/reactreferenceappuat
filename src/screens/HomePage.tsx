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
    // async function init() {
    //   try {
    //     await b2cClient.init();
    //     const token = await getItem("token");
    //     const _username = await getItem("username");
    //     setUsername(_username);
    //     console.log("Tokne>>>>>>>>>>>>", token);
    //     console.log("username>>>>>>>>>", _username);
    //     if(!token) {
    //       clearStorage();
    //       initiateMSALAuthentication();
    //     }
    //   } catch (error: any) {
    //     console.log("___Error while MSAL init", JSON.stringify(error));
    //     clearStorage();
    //     initiateMSALAuthentication();
    //   }
    // }
    // init();
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


  const initiateMSALAuthentication = async () => {
    setLoading(true);
    try {
      const msalresponse = await b2cClient.signIn({
        scopes: b2cScopes.scopes,
        webviewParameters,
      });


      Alert.alert("MSAL response:::::" + JSON.stringify(msalresponse));

      console.log("--------------------------", msalresponse);
      // console.log("username>>>>>>>>", msalresponse?.account.username);
      // console.log("token>>>>>>>>>>>", msalresponse?.accessToken);
      console.log("???????????????????????", msalresponse?.idToken);
      // if (Platform.OS == 'ios') {
      //   NativeModules.IntuneWrapper.registerAndEnroll(msalresponse.account.username);
      // } /*else {
      //   NativeModules.IntuneWrapperModule.registerAndEnroll(
      //     res.account.claims.preferred_username,
      //     res.account.claims.aud[0],
      //     res.account.tenantId,
      //   );
      // }*/
      setItem("username", msalresponse?.account.username);
      setItem("token", msalresponse?.accessToken);
      setUsername(msalresponse?.account.username);
      setResponse(msalresponse?.account);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Alert.alert("MSAL response:::::error" + JSON.stringify(error));
    }
  };


  const openLink = async () => {
    try {
      const idToken = await getItem("idToken");
      const username = await getItem('username');
      // const url = `https://aka.ms/sspr/?username=${username}`;
      const url = "https://ey.billyard.de"
      console.log("Final url>>>>", url);
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right'
          },
          // headers: {
          //   'Authorization': `Bearer ${idToken}`
          // }
        });
      }
    } catch (error: any) {
      console.log(">>>>>>Error", JSON.stringify(error));
      Alert.alert(">>>>>>>>>>>", JSON.stringify(error));
      Alert.alert(">>LLLLLLLLL" + error.message || "No inapp browser")
    }
  }

  const openWebLink = async () => {
    try {
      const idToken = await getItem("idToken");
      const username = await getItem('username');
      // const url = `https://aka.ms/sspr/?username=${username}`;
      const url = "https://webapp.billyard.de"
      console.log("Final url>>>>", url);
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right'
          },
          // headers: {
          //   'Authorization': `Bearer ${idToken}`
          // }
        });
      }
    } catch (error: any) {
      console.log(">>>>>>Error", JSON.stringify(error));
      Alert.alert(">>>>>>>>>>>", JSON.stringify(error));
      Alert.alert(">>LLLLLLLLL" + error.message || "No inapp browser")
    }
  }


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

        <Button
          onPress={openLink}
          title="Open Link"
          color="#841584"
        />

        <Button
          onPress={openWebLink}
          title="Open Web Link"
          color="#841584"
        />

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