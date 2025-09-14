interface SignUpInfo {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignInInfo {
  username: string;
  password: string;
}
interface UserInfo {
  username: string;
  email: string;
}
export { SignInInfo, SignUpInfo, UserInfo };
