import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";

function CartPage() {
  const cartItems = [
    { id: 1, name: "Aceite de Oliva", price: 12, quantity: 2 },
    { id: 2, name: "Té Verde", price: 5, quantity: 1 },
    { id: 3, name: "Miel Natural", price: 8, quantity: 3 },
  ];

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="app">
      <Navbar />

      <main className="container">
        <h1 className="text-center mt-4">Carrito de Compras</h1>
        <br />
        <div className="cart-items mt-2">
          {cartItems.map((item) => (
            <div key={item.id} className="card cart-item">
              <span>
                {item.name} x {item.quantity} = Bs. {item.price * item.quantity}
              {/* {item.name} x {item.quantity} = Bs. {item.price * item.quantity} */}
              </span>
            </div>
          ))}
        </div>

        <h3 className="text-center mt-4">Total: Bs. {total}</h3>
 
        <div className="text-center mt-2">
          <button className="button">Proceder al Pago</button>
        </div>
        <br />
        {/* Sección adicional de tips */}
        <section className="cart-tips mt-4">
          <h4>Tips para tus compras:</h4>
          <ul>
            <li>Revisa siempre la fecha de caducidad de los productos.</li>
            <li>
              Agrega productos complementarios para aprovechar promociones.
            </li>
            <li>Verifica tu carrito antes de finalizar la compra.</li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default CartPage;
