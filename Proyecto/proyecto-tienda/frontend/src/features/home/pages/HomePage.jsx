import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";

function HomePage() {
  const promotions = [
    {
      id: 1,
      title: "Envío gratis",
      description: "En compras mayores a $50",
    },
    {
      id: 2,
      title: "Nuevo producto",
      description: "Té de hierbas orgánico",
    },
    {
      id: 3,
      title: "Oferta especial",
      description: "10% de descuento esta semana",
    },
  ];

  const benefits = [
    {
      id: 1,
      title: "Ingredientes Naturales",
      description:
        "Seleccionamos materias primas de origen natural para garantizar calidad y bienestar.",
    },
    {
      id: 2,
      title: "Compromiso Ambiental",
      description:
        "Promovemos prácticas sostenibles y responsables con el medio ambiente.",
    },
    {
      id: 3,
      title: "Calidad Garantizada",
      description:
        "Productos elaborados bajo altos estándares de seguridad y control.",
    },
  ];

  return (
    <div className="app">
      <Navbar />

      <main>
        <section className="home-hero">
          <h1>Bienvenido a Vida Nova</h1>

          <p>
            Descubre productos naturales diseñados para promover el bienestar,
            el equilibrio y un estilo de vida saludable.
          </p>

          {/* <button className="button">
            Explorar Productos
          </button> */}
        </section>

        {/* <section className="home-carousel-placeholder">
          <h2>Carrusel de promociones próximamente</h2>
        </section> */}

        <section className="home-benefits container">
          {benefits.map((benefit) => (
            <article
              key={benefit.id}
              className="benefit-card"
            >
              <h3>{benefit.title}</h3>

              <p>{benefit.description}</p>
            </article>
          ))}
        </section>

        <section className="home-promotions container">
          <div className="section-header">
            <h2>Promociones y Novedades</h2>
            <p>
              Descubre nuestras ofertas especiales y los
              productos más recientes.
            </p>
          </div>

          <div className="home-promotions-grid">
            {promotions.map((promo) => (
              <article
                key={promo.id}
                className="promo-card"
              >
                <h3>{promo.title}</h3>

                <p>{promo.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-about container">
          <div className="section-header">
            <h2>Sobre Nosotros</h2>
          </div>

          <div className="home-about-content">
            <p>
              En Vida Nova ofrecemos productos saludables,
              sostenibles y de alta calidad. Desde alimentos
              orgánicos hasta suplementos naturales,
              trabajamos para cuidar de ti y del medio
              ambiente.
            </p>

            <p>
              Trabajamos con altos estándares de elaboración,
              priorizando la pureza, calidad y funcionalidad
              de cada uno de nuestros productos, con el
              objetivo de brindarte una experiencia confiable
              y segura.
            </p>

            <p>
              Nuestros productos forman parte de un estilo de
              vida orientado al equilibrio, la prevención y
              el cuidado personal.
            </p>

            <p>
              Recomendamos acompañar su uso con la
              orientación de un profesional de salud,
              especialmente en casos de condiciones
              específicas.
            </p>
          </div>
        </section>

        <section className="home-cta">
          <div className="container">
            <h2>Empieza tu camino hacia una vida más saludable</h2>

            <p>
              Explora nuestro catálogo y descubre opciones
              naturales pensadas para tu bienestar.
            </p>

            <button className="button">
              Ver Productos
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;