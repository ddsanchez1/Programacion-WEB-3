import Footer from "./components/Footer";
function Layout({ children }) {
  return (
    <div className="app-layout">
      {children}
      <Footer />
    </div>
  );
}

export default Layout;