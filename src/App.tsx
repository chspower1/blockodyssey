import React from "react";
import "./App.css";

const App = () => {
  return (
    <div>
      <header>
        상품 검색
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
    </div>
  );
};

export default App;
