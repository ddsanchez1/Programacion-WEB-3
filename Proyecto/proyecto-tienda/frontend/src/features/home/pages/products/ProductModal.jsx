function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-image-container">
          <img
            src={product.imagen}
            alt={product.nombre}
            className="modal-image"
          />
        </div>

        <div className="modal-content">
          <h2>{product.nombre}</h2>

          <p className="modal-category">{product.categoria}</p>

          <p className="modal-description">{product.descripcion}</p>

          <div className="modal-price">Bs. {product.precio}</div>

          <p>Stock disponible: {product.stock}</p>

          {/* <button className="button">Agregar al carrito</button> */}
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
