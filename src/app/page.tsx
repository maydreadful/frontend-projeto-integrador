"use client"; // Necessário para usar hooks no Next.js

import { useState, useEffect } from 'react';
import api from './services/api'; // Importa a conexão com o Render

export default function Dashboard() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Busca os dados reais assim que o painel abre
  useEffect(() => {
    async function carregarDados() {
      try {
        const [resProdutos, resFornecedores] = await Promise.all([
          api.get('/produtos'),
          api.get('/fornecedores')
        ]);
        setProdutos(resProdutos.data);
        setFornecedores(resFornecedores.data);
      } catch (error) {
        console.error("Erro ao carregar o dashboard:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, []);

  return (
    <div className="p-8 bg-zinc-950 min-h-screen text-white">
      {/* Cabeçalho com Identidade Visual Moth Piercing */}
      <div className="mb-10 border-b-2 border-purple-900/30 pb-6">
        <h1 className="text-4xl font-black tracking-tighter text-white">
          PAINEL DE <span className="text-purple-600">CONTROLE</span>
        </h1>
        <p className="text-zinc-500 text-sm mt-2 uppercase tracking-widest">
          Bem-vinda ao seu sistema de gestão gótica.
        </p>
      </div>

      {/* Grid de Cards Dinâmicos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card: Total de Produtos */}
        <div className="bg-zinc-900 p-8 rounded-3xl border border-purple-900/50 shadow-2xl shadow-purple-500/5 hover:border-purple-600 transition-all group">
          <h2 className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Total de Produtos</h2>
          <p className="text-6xl font-black text-purple-600 mt-4 group-hover:scale-110 transition-transform">
            {loading ? "..." : produtos.length}
          </p>
        </div>

        {/* Card: Fornecedores Ativos */}
        <div className="bg-zinc-900 p-8 rounded-3xl border border-purple-900/50 shadow-2xl shadow-purple-500/5 hover:border-purple-600 transition-all group">
          <h2 className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Fornecedores Ativos</h2>
          <p className="text-6xl font-black text-purple-600 mt-4 group-hover:scale-110 transition-transform">
            {loading ? "..." : fornecedores.length}
          </p>
        </div>

        {/* Card: Associações Pendentes (Lógica de exemplo) */}
        <div className="bg-zinc-900 p-8 rounded-3xl border border-purple-900/50 shadow-2xl shadow-purple-500/5 hover:border-purple-600 transition-all group">
          <h2 className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Status do Sistema</h2>
          <p className="text-2xl font-black text-green-500 mt-6">
            {loading ? "CHECKING..." : "BACK-END ONLINE"}
          </p>
        </div>

      </div>

      {/* Rodapé Profissional */}
      <footer className="mt-20 text-zinc-700 text-[10px] uppercase tracking-[0.3em] text-center border-t border-zinc-900 pt-8">
        Moth Piercing Management System © 2026 | Desenvolvido por Mayara Soares
      </footer>
    </div>
  );
}