import { useEffect, useState } from "react";
import api from "../services/api";

export default function Produto() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    codigoBarras: ""
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    const response = await api.get("/produtos");
    setProdutos(response.data);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editId) {
      await api.put(`/produtos/${editId}`, form);
    } else {
      await api.post("/produtos", form);
    }

    setForm({ nome: "", descricao: "", preco: "", codigoBarras: "" });
    setEditId(null);
    carregarProdutos();
  }

  async function handleDelete(id) {
    await api.delete(`/produtos/${id}`);
    carregarProdutos();
  }

  function handleEdit(produto) {
    setForm(produto);
    setEditId(produto.id);
  }

  return (
    <div>
      <h2>Cadastro de Produtos</h2>

      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} />
        <input name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} />
        <input name="preco" placeholder="Preço" value={form.preco} onChange={handleChange} />
        <input name="codigoBarras" placeholder="Código de Barras" value={form.codigoBarras} onChange={handleChange} />
        <button type="submit">{editId ? "Atualizar" : "Cadastrar"}</button>
      </form>

      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            {produto.nome} - R$ {produto.preco}
            <button onClick={() => handleEdit(produto)}>Editar</button>
            <button onClick={() => handleDelete(produto.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}