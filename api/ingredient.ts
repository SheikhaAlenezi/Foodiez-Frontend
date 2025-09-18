import instance from ".";

export const getAllIngredients = async () => {
  const res = await instance.get("/ingredient/getIngredients");
  return res.data;
};

export const createIngredient = async (data: {
  names: string;
  amount?: string;
  recipe?: string;
}) => {
  const res = await instance.post("/ingredient/createIngredient", data);
  return res.data;
};

// export const createIngredient = async (payload: { names: string }) => {
//   const res = await instance.post("/ingredient", payload);
//   return res.data;
// };
