import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </Router>
  );
};

export default App;
