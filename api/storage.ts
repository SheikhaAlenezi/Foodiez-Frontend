import * as SecureStore from "expo-secure-store";

export const storeToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync("token", token);
  } catch (err) {
    console.log("error storing token", err);
  }
};

export const getToken = async () => {
  try {
    return await SecureStore.getItemAsync("token");
  } catch (err) {
    console.log("error getting tokens", err);
  }
};
