"use client";

import { useState, useEffect } from 'react';
import api from '../services/api'; // Caminho corrigido para subir um nível

export default function FornecedoresPage() {
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ nome: '', contato: '' });

  // Função para carregar os fornecedores do Render
  const carregarFornecedores = async () => {
    try {
      const response = await api.get('/fornecedores');
      setFornecedores(Array.isArray(response.data) ? response.data : []);
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
      await api.post('/fornecedores', formData);
      setFormData({ nome: '', contato: '' });
      carregarFornecedores(); // Atualiza a lista na hora
    } catch (error) {
      alert("Erro ao cadastrar fornecedor. O back-end está online?");
    }
  };

  const removerFornecedor = async (id) => {
    if (confirm("Deseja remover este fornecedor?")) {
      await api.delete(`/fornecedores/${id}`);
      carregarFornecedores();
    }
  };

  return (
    <div className="p-8 bg-zinc-950 min-h-screen text-white">
      {/* Cabeçalho Gótico */}
      <div className="mb-10 border-b-2 border-purple-900/30 pb-6">
        <h2 className="text-3xl font-black uppercase tracking-tighter">
          GESTÃO DE <span className="text-purple-600">FORNECEDORES</span>
        </h2>
        <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">Controle de parceiros Moth Piercing</p>
      </div>

      {/* Formulário de Cadastro */}
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 rounded-2xl border border-purple-900/40 mb-12 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input 
            className="bg-zinc-800 border border-zinc-700 p-3 rounded-xl focus:border-purple-500 outline-none transition-all text-white placeholder-zinc-500"
            placeholder="Nome da Empresa / Fornecedor"
            value={formData.nome}
            onChange={(e) => setFormData({...formData, nome: e.target.value})}
            required
          />
          <input 
            className="bg-zinc-800 border border-zinc-700 p-3 rounded-xl focus:border-purple-500 outline-none transition-all text-white placeholder-zinc-500"
            placeholder="Contato (Email ou WhatsApp)"
            value={formData.contato}
            onChange={(e) => setFormData({...formData, contato: e.target.value})}
            required
          />
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-purple-500/10 uppercase tracking-widest text-sm">
            Cadastrar Parceiro
          </button>
        </div>
      </form>

      {/* Tabela de Listagem Dinâmica */}
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50">
        <table className="w-full text-left">
          <thead className="bg-zinc-900 text-zinc-400 border-b border-zinc-800">
            <tr>
              <th className="p-4 uppercase text-[10px] font-bold tracking-widest">Nome</th>
              <th className="p-4 uppercase text-[10px] font-bold tracking-widest">Contato</th>
              <th className="p-4 uppercase text-[10px] font-bold tracking-widest text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {loading ? (
              <tr><td colSpan="3" className="p-10 text-center text-zinc-600 animate-pulse">Sincronizando com o Render...</td></tr>
            ) : fornecedores?.length > 0 ? (
              fornecedores.map((f) => (
                <tr key={f.id} className="hover:bg-purple-950/10 transition-colors group">
                  <td className="p-4 font-medium text-zinc-200">{f.nome}</td>
                  <td className="p-4 text-zinc-400 font-mono text-sm">{f.contato}</td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => removerFornecedor(f.id)}
                      className="text-zinc-600 hover:text-red-500 transition-colors font-bold text-xs uppercase"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="3" className="p-10 text-center text-zinc-700">Nenhum fornecedor cadastrado no sistema.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}