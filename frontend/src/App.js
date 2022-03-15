
import React from 'react'
import Header from "./components/layout/Header/Header.js";
import { BrowserRouter as Router } from 'react-router-dom';
import WebFont from 'webfontloader';
import Footer from "./components/layout/Footer/Footer.js";


function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto:300,400,500,700', 'Material Icons']
      }
    });
  }, [])
  return (

    <Router>
      <Header />
      <Footer />
    </Router>
  );
}

export default App;
