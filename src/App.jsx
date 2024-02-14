import { useState } from "react";

import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <div className="conatainer mx-auto">
        <div className="bg-red-600 ">
          <h1>Your Todos</h1>
        </div>
      </div>
    </>
  );
}

export default App
