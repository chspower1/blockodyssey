import { Category } from "@type/product";
import styles from "@styles/optionBar/CategorySelector.module.css";
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
    <select
      name="select"
      className={styles.CategorySelect}
      onChange={(e) => setCategory(e.currentTarget.value as Category)}
      defaultValue={finalCategory}
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
