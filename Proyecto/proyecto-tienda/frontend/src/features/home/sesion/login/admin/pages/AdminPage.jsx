import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StockChart from "../components/StockChart";
import ReportButtons from "../reports/components/ReportButtons";
import Navbar from "../../../../../shared/components/Navbar";
import Footer from "../../../../../shared/components/Footer";
import { getProducts } from "../../../../../../services/productService";

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  //const sales = [{ id: 1, product: "Mock", amount: 2, total: 24 }];

  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  const outOfStock = products.filter((p) => p.stock === 0).length;

  const totalCategories = new Set(products.map((p) => p.categoria)).size;
  const stockByCategory = products.reduce((acc, product) => {
    const category = product.categoria || "Sin categoría";

    acc[category] = (acc[category] || 0) + product.stock;

    return acc;
  }, {});
  const chartData = Object.entries(stockByCategory)
    .map(([categoria, stock]) => ({
      categoria,
      stock,
    }))
    .sort((a, b) => b.stock - a.stock);
  if (loading) return <p>Cargando...</p>;

  return (
    <div className="app">
      <Navbar />

      <main className="admin-page container">
        <h1 className="admin-title">Panel de Administración</h1>

        <section className="admin-stats">
          <div className="stat-card">
            <h3>Productos</h3>
            <p>{products.length}</p>
          </div>

          <div className="stat-card">
            <h3>Stock Total</h3>
            <p>{totalStock}</p>
          </div>
          <div className="stat-card">
            <h3>Sin Stock</h3>
            <p>{outOfStock}</p>
          </div>

          <div className="stat-card">
            <h3>Categorías</h3>
            <p>{totalCategories}</p>
          </div>
        </section>

        <section className="admin-actions">
          <button
            className="button"
            onClick={() => navigate("/admin/products")}
          >
            Ver inventario
          </button>

          {/* <button className="button" disabled>
            Gestionar Usuarios
          </button> */}

          <button className="button" onClick={() => navigate("/admin/logs")}>
            Ver Logs
          </button>
        </section>

        {/* <section className="admin-section">
          <h2>Inventario</h2>

          <div className="table">
            <div className="table-header">
              <span>Producto</span>
              <span>Precio</span>
              <span>Stock</span>
            </div>

            {products.map((p) => (
              <div key={p.id} className="table-row">
                <span>{p.nombre}</span>
                <span>Bs. {p.precio}</span>
                <span>{p.stock}</span>
              </div>
            ))}
          </div>
        </section> */}

        <section className="admin-section">
          <h2>Stock segun categorías</h2>

          <div className="chart-container">
            <StockChart data={chartData} />
          </div>
        </section>

        

      <section className="admin-section">
        <h2>Reportes</h2>

        <ReportButtons products={products} />
      </section>
      </main>

      <Footer />
    </div>
  );
}

export default AdminPage;
