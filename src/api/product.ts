export const getProducts = async () => {
  const result = await (await fetch(`https://dummyjson.com/products?limit=`)).json();
  return result;
};
