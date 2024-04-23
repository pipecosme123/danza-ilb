import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeValueData = async (name, value) => {
  try {
    await AsyncStorage.setItem(name, value);
  } catch (e) {
    console.log(e);
  }
};

export const storeObjectData = async (name, object) => {
  try {
    const jsonValue = JSON.stringify(object);
    await AsyncStorage.setItem(name, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const storeGetValueData = async (name) => {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    console.log(e);
  }
};

export const storeGetObjectData = async (name) => {
  try {
    const jsonValue = await AsyncStorage.getItem(name);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const storeGetAllKeys = async () => {
  let keys = []
  try {
    keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch(e) {
   console.log(e);
  }
}

export const storeClearAll = async () => {
  try {
    await AsyncStorage.clear()
    console.log('Done.')
  } catch(e) {
    console.log(e)
  }
}