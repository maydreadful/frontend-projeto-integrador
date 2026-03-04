import { useEffect, useState } from "react";
import api from "../services/api";

export default function Associacao() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [associacoes, setAssociacoes] = useState([]);
  const [produtoId, setProdutoId] = useState("");
  const [fornecedorId, setFornecedorId] = useState("");

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    const produtosRes = await api.get("/produtos");
    const fornecedoresRes = await api.get("/fornecedores");
    const associacoesRes = await api.get("/associacoes");

    setProdutos(produtosRes.data);
    setFornecedores(fornecedoresRes.data);
    setAssociacoes(associacoesRes.data);
  }

  async function handleAssociar() {
    await api.post("/associacoes", {
      produtoId,
      fornecedorId
    });

    carregarDados();
  }

  async function handleDelete(id) {
    await api.delete(`/associacoes/${id}`);
    carregarDados();
  }

  return (
    <div>
      <h2>Associação Produto / Fornecedor</h2>

      <select onChange={(e) => setProdutoId(e.target.value)}>
        <option>Selecione Produto</option>
        {produtos.map((produto) => (
          <option key={produto.id} value={produto.id}>
            {produto.nome}
          </option>
        ))}
      </select>

      <select onChange={(e) => setFornecedorId(e.target.value)}>
        <option>Selecione Fornecedor</option>
        {fornecedores.map((fornecedor) => (
          <option key={fornecedor.id} value={fornecedor.id}>
            {fornecedor.nome}
          </option>
        ))}
      </select>

      <button onClick={handleAssociar}>Associar</button>

      <ul>
        {associacoes.map((assoc) => (
          <li key={assoc.id}>
            Produto: {assoc.produto?.nome} | Fornecedor: {assoc.fornecedor?.nome}
            <button onClick={() => handleDelete(assoc.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}