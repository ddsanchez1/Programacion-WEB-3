import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../../../shared/components/Navbar";
import Footer from "../../../../../shared/components/Footer";
// import { useProductForm } from "../hooks/useProductForm";
//import { useAdminProducts } from "../hooks/useAdminProducts";
import ProductForm from "../components/ProductForm";

import { useProductForm } from "../hooks/useProductForm";

export default function ProductFormPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { form, loading, isEdit, handleChange, handleSubmit } = useProductForm(
    id,
    navigate,
  );

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="app">
      <Navbar />

      <main className="container">
        <div className="form-page-header">
          <h1>{isEdit ? "Editar Producto" : "Nuevo Producto"}</h1>

          <p className="form-page-subtitle">
            {isEdit
              ? "Actualiza la información del producto."
              : "Registra un nuevo producto en el inventario."}
          </p>
        </div>
        <ProductForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isEdit={isEdit}
        />
      </main>

      <Footer />
    </div>
  );
}
