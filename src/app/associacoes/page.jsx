"use client";

import { useState, useEffect } from 'react';
import api from '../services/api';

export default function AssociacoesPage() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [associacoes, setAssociacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({ produtoId: '', fornecedorId: '' });

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [resProd, resForne, resAssoc] = await Promise.all([
        api.get('/produtos'),
        api.get('/fornecedores'),
        api.get('/associacoes')
      ]);

      setProdutos(Array.isArray(resProd.data) ? resProd.data : []);
      setFornecedores(Array.isArray(resForne.data) ? resForne.data : []);
      setAssociacoes(Array.isArray(resAssoc.data) ? resAssoc.data : []);
    } catch (error) {
      console.error("Erro ao carregar dados para associação:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleAssociar = async (e) => {
    e.preventDefault();
    try {
      if (!formData.produtoId || !formData.fornecedorId) {
        alert("Selecione ambos para vincular.");
        return;
      }
      await api.post('/associacoes', formData);
      setFormData({ produtoId: '', fornecedorId: '' });
      carregarDados();
    } catch (error) {
      alert("Erro ao criar vínculo. Verifique se essa associação já existe.");
    }
  };

  const handleRemover = async (id) => {
    if (confirm("Deseja remover este vínculo?")) {
      try {
        await api.delete(`/associacoes/${id}`);
        carregarDados();
      } catch (error) {
        alert("Erro ao remover associação.");
      }
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="mb-10 border-b-4 border-purple-600 pb-4">
        <h2 className="text-3xl font-black text-black">VÍNCULOS <span className="text-purple-600">N:N</span></h2>
        <p className="text-gray-500 uppercase text-xs tracking-widest mt-1">Associação Produto e Fornecedor</p>
      </div>

      <form onSubmit={handleAssociar} className="bg-zinc-50 p-6 rounded-2xl border border-gray-200 mb-12 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-bold mb-2">Selecione o Produto</label>
            <select 
              className="border-2 border-gray-200 p-3 rounded-xl focus:border-purple-500 outline-none bg-white transition-all"
              value={formData.produtoId}
              onChange={(e) => setFormData({...formData, produtoId: e.target.value})}
              required
            >
              <option value="">-- Escolha um produto --</option>
              {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-bold mb-2">Selecione o Fornecedor</label>
            <select 
              className="border-2 border-gray-200 p-3 rounded-xl focus:border-purple-500 outline-none bg-white transition-all"
              value={formData.fornecedorId}
              onChange={(e) => setFormData({...formData, fornecedorId: e.target.value})}
              required
            >
              <option value="">-- Escolha um fornecedor --</option>
              {fornecedores.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
            </select>
          </div>

          <div className="flex flex-col justify-end">
            <button type="submit" className="bg-purple-600 hover:bg-black text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-purple-200 uppercase tracking-tighter">
              Vincular Agora
            </button>
          </div>
        </div>
      </form>

      <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-4 uppercase text-xs font-black">Produto</th>
              <th className="p-4 uppercase text-xs font-black">Fornecedor</th>
              <th className="p-4 uppercase text-xs font-black text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan="3" className="p-10 text-center text-gray-400 font-medium">Sincronizando banco de dados...</td></tr>
            ) : associacoes.length > 0 ? (
              associacoes.map((assoc) => (
                <tr key={assoc.id} className="hover:bg-purple-50 transition-colors">
                  <td className="p-4 font-semibold text-gray-800 italic">
                    {assoc.Produto?.nome || "Produto não identificado"}
                  </td>
                  <td className="p-4 text-gray-600">
                    {assoc.Fornecedor?.nome || "Fornecedor não identificado"}
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => handleRemover(assoc.id)}
                      className="text-red-500 hover:text-red-700 font-bold text-sm px-4 py-2 rounded-lg hover:bg-red-50 transition-all"
                    >
                      Desvincular
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="3" className="p-10 text-center text-gray-400">Nenhum vínculo encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}