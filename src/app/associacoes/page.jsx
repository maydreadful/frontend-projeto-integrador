"use client";

import { useEffect, useState } from "react";
import api from "../services/api";

export default function AssociacoesPage() {
  const [associacoes, setAssociacoes] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    codigoBarras: ""
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    carregarAssociacoes();
  }, []);

  async function carregarAssociacoes() {
    const response = await api.get("/associacoes");
    setAssociacoes(response.data);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editId) {
      await api.put(`/associacoes/${editId}`, form);
    } else {
      await api.post("/associacoes", form);
    }

    setForm({ nome: "", descricao: "", preco: "", codigoBarras: "" });
    setEditId(null);
    carregarAssociacoes();
  }

  async function handleDelete(id) {
    await api.delete(`/associacoes/${id}`);
    carregarAssociacoes();
  }

  function handleEdit(produto) {
    setForm(produto);
    setEditId(produto.id);
  }

  return (
    <div>
      <h2>Cadastro de Associações</h2>

      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} />
        <input name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} />
        <input name="preco" placeholder="Preço" value={form.preco} onChange={handleChange} />
        <input name="codigoBarras" placeholder="Código de Barras" value={form.codigoBarras} onChange={handleChange} />
        <button type="submit">{editId ? "Atualizar" : "Cadastrar"}</button>
      </form>

      <ul>
        {associacoes.map((associacao) => (
          <li key={associacao.id}>
            {associacao.nome} - R$ {associacao.preco}
            <button onClick={() => handleEdit(associacao)}>Editar</button>
            <button onClick={() => handleDelete(associacao.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}