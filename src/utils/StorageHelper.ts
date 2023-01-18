import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage, // for web: window.localStorage
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync: {}
  });

export const setItem = (key: any, value: string) => {
    storage.save({
        key: key,
        data: value
    });
}

export const getItem = async (key: any) => {
    return await storage.load({
        key: key,
        autoSync: true,
        syncInBackground: true,
        syncParams: {
            extraFetchOptions: {
            },
            someFlag: true
        }
    });
}

export const clearStorage = async () => {
    await AsyncStorage.clear();
}
