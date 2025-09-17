import { SelectedIngredient } from "@/data/userInfo";
import instance from ".";

export const createRecipe = async (data: {
  title: string;
  description: string;
  instructions: string;
  prep: string;
  serving: string;
  category: string;
  ingredients: SelectedIngredient[];
}) => {
  return await instance.post("recipe/createRecipe", data);
};

export const getAllRecipe = async () => {
  const res = await instance.get("/recipe/getAllRecipe");
  return res.data;
};
// recipeName: string;
// description: string;
// instructions: string;
// prep: string;
// serving: string;
// category: string;
// ingredients: SelectedIngredient[];
