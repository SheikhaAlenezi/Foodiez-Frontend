import instance from ".";

export const createCategory = async (data: {
  name: string;
  description: string;
  color: string;
  icon: string;
}) => {
  return await instance.post("/categories/createList", data);
};

export const getAllCategories = async () => {
  return await instance.get("/categories/getAllCategory");
};
export const getRecipesByCategory = async (categoryId: string) => {
  const res = await instance.get(`/categories/${categoryId}/recipes`);
  return res.data;
};
