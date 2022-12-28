import { useQuery } from "@tanstack/react-query";
import React from "react";
import "./App.css";

type Image = string;
interface Product {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: Image[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}
interface ResponseProducts {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
const App = () => {
  const getProducts = async () => {
    const result = await (await fetch("https://dummyjson.com/products?limit=30")).json();
    return result;
  };
  const { data: products, isLoading } = useQuery<ResponseProducts>(["products"], getProducts, {
    onSuccess(data) {
      console.log(data);
    },
  });
  return (
    <div>
      <header>
        <h3>상품 검색</h3>
        <div />
        <div>
          <div>검색</div>
          <select name="select">
            <option value="title">상품명</option>
            <option value="brand">브랜드</option>
            <option value="description">상품내용</option>
          </select>
          <input type="text" />
          <button>조회</button>
        </div>
      </header>
      <div>
        <header>
          <p>상품번호</p>
          <p>상품명</p>
          <p>브랜드</p>
          <p>상품내용</p>
          <p>가격</p>
          <p>평점</p>
          <p>재고</p>
        </header>
        {/* {products.map()} */}
      </div>
    </div>
  );
};

export default App;
