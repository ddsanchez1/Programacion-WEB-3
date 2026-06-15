import { useEffect, useState } from "react";
import { getCategories } from "../../../../../../services/categoryService";

export function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();

      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    categories,
  };
}