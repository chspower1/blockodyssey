interface getProductsProps {
  limit: number;
  skip: number;
  search: string;
}
export const getProducts = async ({ limit, skip, search }: getProductsProps) => {
  const result = await (
    await fetch(`https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`)
  ).json();
  return result;
};
