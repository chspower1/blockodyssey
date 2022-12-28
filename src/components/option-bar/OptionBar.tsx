const OptionBar = () => {
  return (
    <header>
      <h3>상품 검색</h3>
      <div />
      <div>
        <div>검색</div>
        <select name="select">
          <option value="all">전체</option>
          <option value="title">상품명</option>
          <option value="brand">브랜드</option>
          <option value="description">상품내용</option>
        </select>
        <input type="text" />
        <button>조회</button>
      </div>
    </header>
  );
};
export default OptionBar;
