import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Produto from "./pages/Produto";
import Fornecedor from "./pages/Fornecedor";
import Associacao from "./pages/Associacao";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/produtos">Produtos</Link> |{" "}
        <Link to="/fornecedores">Fornecedores</Link> |{" "}
        <Link to="/associacoes">Associações</Link>
      </nav>

      <Routes>
        <Route path="/produtos" element={<Produto />} />
        <Route path="/fornecedores" element={<Fornecedor />} />
        <Route path="/associacoes" element={<Associacao />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;