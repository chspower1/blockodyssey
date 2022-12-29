import { Category } from "@type/product";

interface CategorySelectorProps {
  finalCategory: Category;
  setCategory: React.Dispatch<React.SetStateAction<Category>>;
  categories: {
    korean: string;
    value: string;
  }[];
}

const CategorySelector = ({ categories, finalCategory, setCategory }: CategorySelectorProps) => {
  return (
    <select name="select" onChange={(e) => setCategory(e.currentTarget.value as Category)}>
      {categories.map((category) => (
        <option value={category.value} selected={finalCategory === category.value}>
          {category.korean}
        </option>
      ))}
    </select>
  );
};
export default CategorySelector;
