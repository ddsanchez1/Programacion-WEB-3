function ProductCard({ product, onSelect }) {
  return (
    <div className="product-card" onClick={() => onSelect(product)}>
      <div className="product-image-container">
        <img
          src={product.imagen}
          alt={product.nombre}
          className="product-image"
        />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.nombre}</h3>

        {/* <div className="product-meta">
        <span>Stock: {product.stock}</span>
        <span>Bs. {product.precio}</span>
      </div> */}
        <div className="product-meta">
          <span>{product.categoria}</span>
          <span>Bs. {product.precio}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
