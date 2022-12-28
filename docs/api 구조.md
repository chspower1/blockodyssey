# Api 구조

dummyJSON에서 제공하는 검색 기능은 title,description안에서 검색하는 조건으로 한정되어 있음,

```js
// dummyJSON github 코드
// search products
controller.searchProducts = ({ limit, skip, select, q: searchQuery }) => {
  let [...products] = frozenData.products.filter((p) => {
    return (
      p.title.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery)
    );
  });
  const total = products.length;

  if (skip > 0) {
    products = products.slice(skip);
  }

  if (products.length > limit) {
    products.length = limit;
  }

  if (select) {
    products = getMultiObjectSubset(products, select);
  }

  const result = { products, total, skip, limit: products.length };

  return result;
};
```

브랜드와 카테고리를 포함하는 검색조건을 만족시키려면 프론트단에서 페이지네이션하는게 불가피해 보임.
