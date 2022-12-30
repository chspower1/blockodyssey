import { useEffect, useState } from "react";

const SortButton = () => {
  const [isUpper, setIsUpper] = useState(true);
  useEffect(() => {
    if (isUpper) {
    } else {
    }
  }, [isUpper]);
  return (
    <button type="button" onClick={() => setIsUpper((prev) => !prev)}>
      {isUpper ? "⬆️" : "⬇️"}
    </button>
  );
};
export default SortButton;
