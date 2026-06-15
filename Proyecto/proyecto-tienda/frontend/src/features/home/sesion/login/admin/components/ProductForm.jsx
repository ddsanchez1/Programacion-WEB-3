import { useCategories } from "../hooks/useCategories";

export default function ProductForm({
  form,
  handleChange,
  handleSubmit,
  isEdit,
}) {
  const { categories } = useCategories();

  return (
    <div className="product-form-card">
      <form className="form product-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />

          <div className="full-width">
            <textarea
              name="descripcion"
              placeholder="Descripción"
              value={form.descripcion}
              onChange={handleChange}
              rows="5"
            />
          </div>

          <input
            type="number"
            name="precio"
            min="0"
            step="0.01"
            placeholder="Precio"
            value={form.precio}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="stock"
            min="0"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            required
          />

          <select
            name="categoria_id"
            value={form.categoria_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una categoría</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nombre}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="imagen"
            placeholder="URL Imagen"
            value={form.imagen}
            onChange={handleChange}
          />

          <div className="form-actions">
            <button
              type="button"
              className="button button-secondary"
              onClick={() => window.history.back()}
            >
              Cancelar
            </button>

            <button type="submit" className="button">
              {isEdit ? "Actualizar Producto" : "Crear Producto"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
