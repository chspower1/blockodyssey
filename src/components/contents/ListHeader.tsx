import "@style/Item.css";

const ListHeader = () => {
  return (
    <div className="ItemWrapper">
      <p>상품번호</p>
      <p>상품명</p>
      <p>브랜드</p>
      <p>상품내용</p>
      <p>가격</p>
      <p>평점</p>
      <p>재고</p>
    </div>
  );
};
export default ListHeader;
