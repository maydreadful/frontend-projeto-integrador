"use client";

import { useState, useEffect } from 'react';
import api from '../services/api'; // Caminho para a conexão com o Render

export default function AssociacoesPage() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [associacoes, setAssociacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ produtoId: '', fornecedorId: '' });

  // Busca todos os dados necessários para o vínculo
  const carregarDados = async () => {
    try {
      const [resProd, resForn, resAssoc] = await Promise.all([
        api.get('/produtos'),
        api.get('/fornecedores'),
        api.get('/associacoes')
      ]);
      setProdutos(resProd.data);
      setFornecedores(resForn.data);
      setAssociacoes(resAssoc.data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/associacoes', formData);
      alert("Vínculo processado com sucesso! ⚖️");
      setFormData({ produtoId: '', fornecedorId: '' });
      carregarDashboard(); // Atualiza a lista local
    } catch (error) {
      alert("Erro ao vincular. Verifique se essa relação já existe.");
    }
  };

  return (
    <div className="p-8 bg-zinc-950 min-h-screen text-white">
      {/* Cabeçalho Gótico Moderno */}
      <div className="mb-10 border-b-2 border-purple-900/30 pb-6">
        <h2 className="text-3xl font-black uppercase tracking-tighter">
          VINCULAR <span className="text-purple-600">N:N</span>
        </h2>
        <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">Associação de Produtos e Fornecedores Moth Piercing</p>
      </div>

      {/* Formulário de Seleção (Dropdowns) */}
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-3xl border border-purple-900/40 mb-12 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          
          <div>
            <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-2 tracking-widest">Selecionar Piercing</label>
            <select 
              className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-xl focus:border-purple-500 outline-none text-white"
              value={formData.produtoId}
              onChange={(e) => setFormData({...formData, produtoId: e.target.value})}
              required
            >
              <option value="">Escolha um produto...</option>
              {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-2 tracking-widest">Selecionar Fornecedor</label>
            <select 
              className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-xl focus:border-purple-500 outline-none text-white"
              value={formData.fornecedorId}
              onChange={(e) => setFormData({...formData, fornecedorId: e.target.value})}
              required
            >
              <option value="">Escolha um fornecedor...</option>
              {fornecedores.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
            </select>
          </div>

          <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-purple-500/20 uppercase text-xs tracking-[0.2em]">
            EXECUTAR VÍNCULO
          </button>
        </div>
      </form>

      {/* Tabela de Associações Ativas */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-900 text-purple-400 border-b border-zinc-800">
            <tr>
              <th className="p-4 uppercase text-[10px] font-bold tracking-widest">Produto (Moth Piercing)</th>
              <th className="p-4 uppercase text-[10px] font-bold tracking-widest">Fornecedor Associado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {loading ? (
              <tr><td colSpan="2" className="p-10 text-center text-zinc-600 animate-pulse uppercase text-xs">Consultando registros...</td></tr>
            ) : associacoes?.length > 0 ? (
              associacoes.map((a, index) => (
                <tr key={index} className="hover:bg-purple-950/5 transition-colors">
                  <td className="p-4 text-zinc-200 font-medium">{a.Produto?.nome || '—'}</td>
                  <td className="p-4 text-zinc-400 uppercase text-xs tracking-wider">{a.Fornecedor?.nome || '—'}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="2" className="p-10 text-center text-zinc-700 uppercase text-xs">Nenhuma associação formalizada ainda.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}