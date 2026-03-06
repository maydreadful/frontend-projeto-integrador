"use client";

import { useState, useEffect } from "react";
import api from "../services/api";

export default function ProdutosPage() {

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    nome: "",
    preco: "",
    descricao: "",
    codigoBarras: ""
  });

  const carregarProdutos = async () => {
    try {
      const response = await api.get("/produtos");
      setProdutos(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      setProdutos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await api.post("/produtos", formData);

      setProdutos([...produtos, response.data]);

      setFormData({
        nome: "",
        preco: "",
        descricao: "",
        codigoBarras: ""
      });

    } catch (error) {
      alert("Erro ao cadastrar produto.");
    }
  };

  const removerProduto = async (id) => {
    if (confirm("Deseja remover este produto?")) {
      await api.delete(`/produtos/${id}`);
      carregarProdutos();
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">

      <h2 className="text-3xl font-bold mb-8">Cadastro de Produtos</h2>

      <form onSubmit={handleSubmit} className="mb-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

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
            type="number"
            className="border p-3 rounded"
            placeholder="Preço"
            value={formData.preco}
            onChange={(e) =>
              setFormData({ ...formData, preco: e.target.value })
            }
            required
          />

          <input
            className="border p-3 rounded"
            placeholder="Descrição"
            value={formData.descricao}
            onChange={(e) =>
              setFormData({ ...formData, descricao: e.target.value })
            }
          />

          <input
            className="border p-3 rounded"
            placeholder="Código de Barras"
            value={formData.codigoBarras}
            onChange={(e) =>
              setFormData({ ...formData, codigoBarras: e.target.value })
            }
          />

        </div>

        <button
          type="submit"
          className="mt-4 bg-purple-600 text-white px-6 py-2 rounded"
        >
          Cadastrar Produto
        </button>

      </form>

      <table className="w-full border">

        <thead className="bg-black text-white">
          <tr>
            <th className="p-3">Nome</th>
            <th className="p-3">Preço</th>
            <th className="p-3">Descrição</th>
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
          ) : produtos.length > 0 ? (

            produtos.map((p) => (

              <tr key={p.id} className="border-t">

                <td className="p-3">{p.nome}</td>
                <td className="p-3">
                  R$ {parseFloat(p.preco).toFixed(2)}
                </td>
                <td className="p-3">{p.descricao}</td>

                <td className="p-3">

                  <button
                    onClick={() => removerProduto(p.id)}
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
                Nenhum produto cadastrado
              </td>
            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}