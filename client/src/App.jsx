import { Route, Routes } from "react-router-dom";

// Componenets
import HomePage from "./components/HomePage";
import Converter from "./components/Converter";
import Charts from "./components/charts";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        {/* <Route exact path="/convert" element={<Converter />} /> */}
        <Route exact path="/charts" element={<Charts />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
