"use client";

import { useState, useEffect } from "react";
import api from "../services/api";

export default function FornecedoresPage() {

  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    nome: "",
    contato: "",
    email: ""
  });

  const carregarFornecedores = async () => {

    try {

      const response = await api.get("/fornecedores");

      setFornecedores(
        Array.isArray(response.data) ? response.data : []
      );

    } catch (error) {

      console.error("Erro ao carregar fornecedores:", error);
      setFornecedores([]);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    carregarFornecedores();
  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post("/fornecedores", formData);

      setFornecedores([...fornecedores, response.data]);

      setFormData({
        nome: "",
        contato: "",
        email: ""
      });

    } catch (error) {

      alert("Erro ao cadastrar fornecedor");

    }
  };

  const removerFornecedor = async (id) => {

    if (confirm("Deseja remover este fornecedor?")) {

      await api.delete(`/fornecedores/${id}`);

      carregarFornecedores();

    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">

      <h2 className="text-3xl font-bold mb-8">
        Cadastro de Fornecedores
      </h2>

      <form onSubmit={handleSubmit} className="mb-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            className="border p-3 rounded"
            placeholder="Nome"
            value={formData.nome}
            onChange={(e) =>
              setFormData({ ...formData, nome: e.target.value })
            }
            required
          />

          <input
            className="border p-3 rounded"
            placeholder="Contato"
            value={formData.contato}
            onChange={(e) =>
              setFormData({ ...formData, contato: e.target.value })
            }
          />

          <input
            type="email"
            className="border p-3 rounded"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

        </div>

        <button
          type="submit"
          className="mt-4 bg-purple-600 text-white px-6 py-2 rounded"
        >
          Cadastrar Fornecedor
        </button>

      </form>

      <table className="w-full border">

        <thead className="bg-black text-white">
          <tr>
            <th className="p-3">Nome</th>
            <th className="p-3">Contato</th>
            <th className="p-3">Email</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>

        <tbody>

          {loading ? (
            <tr>
              <td colSpan="4" className="text-center p-6">
                Carregando...
              </td>
            </tr>
          ) : fornecedores.length > 0 ? (

            fornecedores.map((f) => (

              <tr key={f.id} className="border-t">

                <td className="p-3">{f.nome}</td>
                <td className="p-3">{f.contato}</td>
                <td className="p-3">{f.email}</td>

                <td className="p-3">

                  <button
                    onClick={() => removerFornecedor(f.id)}
                    className="text-red-600"
                  >
                    Remover
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td colSpan="4" className="text-center p-6">
                Nenhum fornecedor cadastrado
              </td>
            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}