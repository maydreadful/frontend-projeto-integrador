"use client"; // Obrigatório para usar hooks como useState no Next.js

import { useState, useEffect } from 'react';
// Ajuste de importação baseado na estrutura da imagem bc4502
import api from '../services/api'; 

export default function ProdutosPage() {
  // Inicialização com array vazio evita que o .map quebre o site
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ nome: '', preco: '' });

  // Função para carregar os produtos do back-end SQLite
  const carregarProdutos = async () => {
    try {
      const response = await api.get('/produtos');
      // Garante que o estado seja sempre um array
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
      await api.post('/produtos', formData);
      setFormData({ nome: '', preco: '' });
      carregarProdutos(); // Atualiza a lista após criar o produto
    } catch (error) {
      alert("Erro ao criar produto. Verifique se o back-end está rodando.");
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
      {/* Cabeçalho com Identidade Visual Roxo e Preto */}
      <div className="mb-10 border-b-4 border-purple-600 pb-4">
        <h2 className="text-3xl font-black text-black">MEU <span className="text-purple-600">ESTOQUE</span></h2>
        <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">Gestão de Produtos - Projeto Integrador</p>
      </div>

      {/* Formulário de Cadastro */}
      <form onSubmit={handleSubmit} className="bg-zinc-50 p-6 rounded-2xl border border-gray-100 mb-12 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input 
            className="border-2 border-gray-200 p-3 rounded-xl focus:border-purple-500 outline-none transition-all"
            placeholder="Nome do Produto (ex: Piercing)"
            value={formData.nome}
            onChange={(e) => setFormData({...formData, nome: e.target.value})}
            required
          />
          <input 
            type="number"
            className="border-2 border-gray-200 p-3 rounded-xl focus:border-purple-500 outline-none transition-all"
            placeholder="Preço R$"
            value={formData.preco}
            onChange={(e) => setFormData({...formData, preco: e.target.value})}
            required
          />
          <button type="submit" className="bg-purple-600 hover:bg-black text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-purple-200">
            CADASTRAR PRODUTO
          </button>
        </div>
      </form>

      {/* Tabela de Listagem */}
      <div className="overflow-hidden rounded-2xl border border-gray-200">
        <table className="w-full text-left">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-4 uppercase text-xs font-bold">Produto</th>
              <th className="p-4 uppercase text-xs font-bold">Preço</th>
              <th className="p-4 uppercase text-xs font-bold text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan="3" className="p-10 text-center text-gray-400">Consultando banco de dados...</td></tr>
            ) : produtos?.length > 0 ? (
              // O uso do ?. garante que não haverá erro se a lista estiver vazia
              produtos.map((p) => (
                <tr key={p.id} className="hover:bg-purple-50 transition-colors">
                  <td className="p-4 font-medium text-gray-800">{p.nome}</td>
                  <td className="p-4 text-gray-600 font-mono">R$ {parseFloat(p.preco).toFixed(2)}</td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => removerProduto(p.id)}
                      className="text-red-500 hover:text-red-700 font-bold px-3 py-1"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="3" className="p-10 text-center text-gray-400">Nenhum produto cadastrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}