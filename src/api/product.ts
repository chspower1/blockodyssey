interface getProductsProps {
  limit: number;
  skip: number;
  search: string;
}
interface getSearchAllProductsProps {
  search: string;
}
export const getProducts = async ({ limit, skip, search }: getProductsProps) => {
  const result = await (
    await fetch(`https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`)
  ).json();
  return result;
};
export const getSearchAllProducts = async ({ search }: getSearchAllProductsProps) => {
  const result = await (await fetch(`https://dummyjson.com/products/search?q=${search}`)).json();
  return result;
};
