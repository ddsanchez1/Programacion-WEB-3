import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../../../shared/components/Navbar";
import Footer from "../../../../../shared/components/Footer";
import { useAdminProducts } from "../hooks/useAdminProducts";
import { useCategories } from "../hooks/useCategories";
import ConfirmModal from "../../../../../../components/ConfirmModal";

export default function AdminProductsPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filterStock, setFilterStock] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [productToDelete, setProductToDelete] = useState(null);

  const productsPerPage = 10;
  const { products, loading, handleDelete } = useAdminProducts();
  const { categories } = useCategories();
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.nombre
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStock =
        filterStock === "all"
          ? true
          : filterStock === "available"
            ? product.stock > 0
            : product.stock === 0;

      const matchesCategory =
        filterCategory === "all"
          ? true
          : String(product.categoria_id) === filterCategory;

      return matchesSearch && matchesStock && matchesCategory;
    });
  }, [products, search, filterStock, filterCategory]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;

  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div className="app">
      <Navbar />
      <button className="button-onHeader" onClick={() => navigate("/admin/")}>
        Retroceder
      </button>
      <main className="admin-page container">
        <div className="admin-header">
          <div>
            <h1>Gestión de Productos</h1>

            <p className="admin-subtitle">
              Administra el inventario de productos registrados en el sistema.
            </p>
          </div>

          <button
            className="button"
            onClick={() => navigate("/admin/products/new")}
          >
            Nuevo Producto
          </button>
        </div>

        <section className="admin-stats">
          <div className="stat-card">
            <h3>Total Productos</h3>
            <p>{products.length}</p>
          </div>

          <div className="stat-card">
            <h3>Stock Total</h3>

            <p>{products.reduce((acc, p) => acc + p.stock, 0)}</p>
          </div>

          <div className="stat-card">
            <h3>Sin Stock</h3>

            <p>{products.filter((p) => p.stock === 0).length}</p>
          </div>
        </section>
        <section className="admin-toolbar">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="admin-search"
          />
          <select
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">Todas las categorías</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nombre}
              </option>
            ))}
          </select>

          <div className="admin-filters">
            <button
              className={
                filterStock === "all" ? "button" : "button button-secondary"
              }
              onClick={() => {
                setFilterStock("all");
                setCurrentPage(1);
              }}
            >
              Todos
            </button>

            <button
              className={
                filterStock === "available"
                  ? "button"
                  : "button button-secondary"
              }
              onClick={() => {
                setFilterStock("available");
                setCurrentPage(1);
              }}
            >
              Con Stock
            </button>

            <button
              className={
                filterStock === "empty" ? "button" : "button button-secondary"
              }
              onClick={() => {
                setFilterStock("empty");
                setCurrentPage(1);
              }}
            >
              Sin Stock
            </button>
          </div>
        </section>

        <br />
        <div className="table">
          <div className="table-header products-table">
            <span>Producto</span>
            <span>Precio</span>
            <span>Stock</span>
            <span>Categoria</span>
            <span>Estado</span>
            <span>Acciones</span>
          </div>

          {paginatedProducts.map((product) => (
            <div key={product.id} className="table-row products-table">
              <span>{product.nombre}</span>

              <span>Bs. {product.precio}</span>

              <span>{product.stock}</span>

              <span>{product.categoria}</span>

              <span>
                <span
                  className={
                    product.stock > 0 ? "badge-success" : "badge-danger"
                  }
                >
                  {product.stock > 0 ? "Disponible" : "Agotado"}
                </span>
              </span>

              <div className="table-actions">
                <button
                  className="button button-secondary"
                  onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                >
                  Editar
                </button>

                <button
                  className="button button-danger"
                  onClick={() => setProductToDelete(product)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div className="empty-state">No se encontraron productos.</div>
          )}
        </div>
        <br></br>
        <div className="pagination">
          <button
            className="button button-secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Anterior
          </button>

          <span>
            Página {currentPage} de {totalPages || 1}
          </span>

          <button
            className="button button-secondary"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Siguiente
          </button>
        </div>
      </main>
      <ConfirmModal
        open={!!productToDelete}
        title="Eliminar producto"
        message={`¿Está seguro de eliminar "${productToDelete?.nombre}"?`}
        onCancel={() => setProductToDelete(null)}
        onConfirm={async () => {
          await handleDelete(productToDelete.id);

          setProductToDelete(null);
        }}
      />
      <Footer />
    </div>
  );
}
