import instance from ".";

export const createRecipe = async (data: {
  recipeName: string;
  description: string;
  instructions: string;
  prep: string;
  serving: string;
  category: string;
  ingredients: [];
}) => {
  return await instance.post("recipe/createRecipe", data);
};
