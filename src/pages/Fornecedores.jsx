import { useEffect, useState } from "react";
import api from "../services/api";

export default function Fornecedor() {
  const [fornecedores, setFornecedores] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    cnpj: "",
    endereco: "",
    contato: ""
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    carregarFornecedores();
  }, []);

  async function carregarFornecedores() {
    const response = await api.get("/fornecedores");
    setFornecedores(response.data);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editId) {
      await api.put(`/fornecedores/${editId}`, form);
    } else {
      await api.post("/fornecedores", form);
    }

    setForm({ nome: "", cnpj: "", endereco: "", contato: "" });
    setEditId(null);
    carregarFornecedores();
  }

  async function handleDelete(id) {
    await api.delete(`/fornecedores/${id}`);
    carregarFornecedores();
  }

  function handleEdit(fornecedor) {
    setForm(fornecedor);
    setEditId(fornecedor.id);
  }

  return (
    <div>
      <h2>Cadastro de Fornecedores</h2>

      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} />
        <input name="cnpj" placeholder="CNPJ" value={form.cnpj} onChange={handleChange} />
        <input name="endereco" placeholder="Endereço" value={form.endereco} onChange={handleChange} />
        <input name="contato" placeholder="Contato" value={form.contato} onChange={handleChange} />
        <button type="submit">{editId ? "Atualizar" : "Cadastrar"}</button>
      </form>

      <ul>
        {fornecedores.map((fornecedor) => (
          <li key={fornecedor.id}>
            {fornecedor.nome}
            <button onClick={() => handleEdit(fornecedor)}>Editar</button>
            <button onClick={() => handleDelete(fornecedor.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}