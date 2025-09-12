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
export { SignInInfo, SignUpInfo };
