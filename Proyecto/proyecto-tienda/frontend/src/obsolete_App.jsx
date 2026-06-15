import "./features/styles/global.css";
import "./features/styles/layout.css";
import "./features/styles/navbar.css";
import "./features/styles/hero.css";
import "./features/styles/buttons.css";
import "./features/styles/cards.css";
import "./features/styles/products.css";
import "./features/styles/login.css";
import "./features/styles/admin.css";
import "./features/styles/modal.css";
import HomePage from "./features/home/pages/HomePage";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    
    <HomePage />
  );
}

export default App;
