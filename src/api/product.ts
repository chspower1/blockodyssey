interface getProductsProps {
  limit: number;
  skip: number;
}
export const getProducts = async ({ limit, skip }: getProductsProps) => {
  const result = await (
    await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
  ).json();
  return result;
};
