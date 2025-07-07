import { HomePage } from "./pages/HomePage";
import { Routes, Route } from "react-router";
import './App.css';

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<HomePage />}></Route>  niche iska shortcut*/}
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<div>test check</div>} />
    </Routes>
  )
}

export default App
