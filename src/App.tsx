import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./components/Main";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Main />
      <Footer />
    </>
  );
}

export default App;
