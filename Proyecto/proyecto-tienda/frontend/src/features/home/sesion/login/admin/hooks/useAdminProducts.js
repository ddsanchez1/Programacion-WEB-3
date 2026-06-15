import { useCallback, useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
} from "../../../../../../services/productService";

export function useAdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      try {
        await deleteProduct(id);

        await loadProducts();
      } catch (error) {
        console.error(error);
      }
    },
    [loadProducts],
  );
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    loading,
    loadProducts,
    handleDelete,
  };
}
