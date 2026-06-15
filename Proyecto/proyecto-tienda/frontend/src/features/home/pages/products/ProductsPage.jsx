import Navbar from "../../../shared/components/Navbar";
import Footer from "../../../shared/components/Footer";
import { useState, useEffect } from "react";
// import api from "../../../../../../backend/src/services/productos";
import ProductCard from "./components/ProductCard";
import ProductModal from "./ProductModal";
import  { getProducts }  from "../../../../services/productService";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
  const products = await getProducts();

        console.log(products);

setProducts(products);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="bg-dark text-light min-vh-100">
      <Navbar />

      <main className="products-page container">
        <h1 className="products-title">Nuestros Productos</h1>
        <p>
          Todos nuestros productos han sido desarrollados bajo un enfoque de
          bienestar integral y apoyo narutal, utilizando ingredientes
          seleccionados y procesos cuidadosamente elaborados.
        </p>
        <br />
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={setSelectedProduct}
            />
          ))}
        </div>
      </main>
      <Footer />
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default ProductsPage;
