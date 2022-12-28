export const getProducts = async () => {
  const result = await (await fetch("https://dummyjson.com/products?limit=30")).json();
  return result;
};
