import { SignInInfo, SignUpInfo } from "@/data/userInfo";
import instance from ".";
import { storeToken } from "./storage";

export const signUp = async (userInfo: SignUpInfo) => {
  const res = await instance.post("/users/signup", userInfo);
  await storeToken(res.data.token);
  return res.data;
};

export const signIn = async (userInfo: SignInInfo) => {
  const res = await instance.post("/users/signin", userInfo);
  await storeToken(res.data.token);
  console.log(res.data);
  return res.data;
};

export const getUsers = async () => {
  const res = await instance.get("/users/users");
  return res.data;
};

export const getUser = async () => {
  const res = await instance.get("/users/myProfile");
  return res.data;
};

export default { signUp, signIn, getUsers };
