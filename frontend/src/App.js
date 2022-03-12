
import React from 'react'
import Header from "./components/layout/Header.js";
import { BrowserRouter as Router } from 'react-router-dom';
import WebFont from 'webfontloader';



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
    </Router>
  );
}

export default App;
