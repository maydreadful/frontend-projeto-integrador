'use client';

import React, { useState, useEffect } from 'react';
import api from '@/services/api'; // Este arquivo deve conter a URL do Render

export default function Fornecedores() {
  // 1. Estados para capturar os inputs do formulário
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [email, setEmail] = useState('');
  const [listaFornecedores, setListaFornecedores] = useState([]);
  const [loading, setLoading] = useState(false);

  // 2. Função para carregar os dados do banco SQLite no Render
  const carregarFornecedores = async () => {
    try {
      const response = await api.get('/fornecedores');
      setListaFornecedores(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados do Render:", error);
    }
  };

  useEffect(() => {
    carregarFornecedores();
  }, []);

  // 3. O Modelo Correto de Cadastro (POST)
  const handleCadastro = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    setLoading(true);

    // Objeto com os nomes das chaves idênticos ao seu server.js
    const novoFornecedor = { nome, contato, email };

    try {
      // Envia os dados para a rota POST no Render
      const response = await api.post('/fornecedores', novoFornecedor);

      if (response.status === 201) {
        alert("Fornecedor cadastrado com sucesso! 🦇");
        // Limpa os campos após o sucesso
        setNome('');
        setContato('');
        setEmail('');
        // Atualiza a tabela imediatamente
        carregarFornecedores();
      }
    } catch (error) {
      // Ajuda a identificar se o erro é CORS ou de servidor
      console.error("Erro na requisição:", error.response?.data || error.message);
      
      if (error.message === "Network Error") {
        alert("Erro de Rede: Verifique se o Render está com status 'Live' e se o CORS está liberado.");
      } else {
        alert("Erro ao cadastrar. Verifique o console do navegador (F12).");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-black min-h-screen text-white">
      <header className="mb-10">
        <h1 className="text-4xl font-black uppercase tracking-tighter">
          Estoque <span className="text-purple-600">Moth Piercing</span>
        </h1>
        <p className="text-zinc-500 text-xs tracking-[0.3em] uppercase">Gestão de Parceiros e Fornecedores</p>
      </header>

      {/* Formulário de Cadastro */}
      <section className="bg-zinc-900/40 p-8 rounded-3xl border border-zinc-800 mb-12">
        <form onSubmit={handleCadastro} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div>
            <label className="text-[10px] font-bold uppercase text-zinc-500 mb-2 block">Nome do Parceiro</label>
            <input 
              type="text" value={nome} onChange={(e) => setNome(e.target.value)} required
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus:border-purple-600 outline-none transition-all"
              placeholder="Ex: Jóias Góticas LTDA"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-zinc-500 mb-2 block">Telefone/Contato</label>
            <input 
              type="text" value={contato} onChange={(e) => setContato(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus:border-purple-600 outline-none transition-all"
              placeholder="(85) 99999-0000"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-zinc-500 mb-2 block">E-mail</label>
            <input 
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 focus:border-purple-600 outline-none transition-all"
              placeholder="contato@fornecedor.com"
            />
          </div>

          <button 
            type="submit" disabled={loading}
            className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-purple-900/20 disabled:opacity-50"
          >
            {loading ? 'GRAVANDO...' : 'CADASTRAR'}
          </button>
        </form>
      </section>

      {/* Listagem de Fornecedores */}
      <div className="bg-zinc-900/20 rounded-3xl border border-zinc-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-900 text-[10px] uppercase font-bold text-zinc-500 tracking-widest">
            <tr>
              <th className="p-5">Nome</th>
              <th className="p-5">Contato</th>
              <th className="p-5">E-mail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {listaFornecedores.length > 0 ? (
              listaFornecedores.map((f) => (
                <tr key={f.id} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="p-5 font-medium">{f.nome}</td>
                  <td className="p-5 text-zinc-400">{f.contato}</td>
                  <td className="p-5 text-zinc-400">{f.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-10 text-center text-zinc-600 text-sm">
                  Nenhum fornecedor encontrado no banco do Render.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}