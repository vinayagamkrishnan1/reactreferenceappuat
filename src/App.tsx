import 'react-native-gesture-handler';
import React, {type PropsWithChildren} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Alert, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { B2CClient } from './MSALAuth/config/b2cClient';
import { b2cConfig } from './MSALAuth/config/msalConfig';
import { HomePage } from './screens/HomePage';
import { store } from './store';

const App = () => {

  const Drawer = createDrawerNavigator();
  const b2cClient = new B2CClient(b2cConfig);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="HomePage">
            <Drawer.Screen 
              name="Sample App"
              component={ HomePage }
              options={{
                headerStyle: {
                  
                },
                headerTintColor: 'black',

                
                headerRight: () => (
                  <TouchableOpacity>
                    {/* <ProfilePicture /> */}
                  </TouchableOpacity>
                ),
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
