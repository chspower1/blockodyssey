import { Category } from "@type/product";
import styles from "@styles/optionBar/CategorySelector.module.css";
import { SetStateAction } from "react";
interface CategorySelectorProps {
  category: Category;
  setCategory: React.Dispatch<React.SetStateAction<Category>>;
  categories: {
    korean: string;
    value: string;
  }[];
  setIsNew: React.Dispatch<SetStateAction<boolean>>;
}

const CategorySelector = ({
  categories,
  category,
  setCategory,
  setIsNew,
}: CategorySelectorProps) => {
  return (
    <select
      name="select"
      className={styles.CategorySelect}
      onChange={(e) => {
        setIsNew(true);
        setCategory(e.currentTarget.value as Category);
      }}
      value={category}
    >
      {categories.map((category) => (
        <option key={category.value} value={category.value}>
          {category.korean}
        </option>
      ))}
    </select>
  );
};
export default CategorySelector;
