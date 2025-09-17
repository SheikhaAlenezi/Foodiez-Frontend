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
interface SelectedIngredient {
  _id: string;
  names: string;
  amount: string;
}
interface RecipeInfo {
  recipeName: string;
  description: string;
  instructions: string;
  prep: string;
  serving: string;
  category: string;
  ingredients: SelectedIngredient[];
}
export { RecipeInfo, SelectedIngredient, SignInInfo, SignUpInfo, UserInfo };
