"use client"; // Transforma em Client Component para buscar dados em tempo real

import { useState, useEffect } from 'react';
import api from './services/api'; // Certifique-se de que o caminho está correto

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);

  // O "motor" que busca os dados no Render assim que o site abre
  useEffect(() => {
    async function carregarDashboard() {
      try {
        const [resProdutos, resFornecedores] = await Promise.all([
          api.get('/produtos'),
          api.get('/fornecedores')
        ]);
        setProdutos(resProdutos.data);
        setFornecedores(resFornecedores.data);
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarDashboard();
  }, []);

  return (
    <div className="p-8 bg-zinc-950 min-h-screen font-sans text-white">
      <main className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-purple-900/30 pb-6">
          <h1 className="text-4xl font-black text-white tracking-tighter">
            PAINEL DE <span className="text-purple-600">CONTROLE</span>
          </h1>
          <p className="text-zinc-500 mt-2 uppercase text-xs tracking-widest">
            Gestão de Estoque — Gran
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card: Total de Produtos Dinâmico */}
          <div className="p-8 bg-zinc-900 border border-purple-900/50 rounded-2xl shadow-2xl shadow-purple-500/5 hover:border-purple-500 transition-all">
            <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Total de Produtos</h2>
            <p className="text-6xl font-black text-purple-600 mt-4">
              {loading ? "..." : produtos.length} 
            </p>
          </div>
          
          {/* Card: Fornecedores Dinâmicos */}
          <div className="p-8 bg-zinc-900 border border-purple-900/50 rounded-2xl shadow-2xl shadow-purple-500/5 hover:border-purple-500 transition-all">
            <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Fornecedores</h2>
            <p className="text-6xl font-black text-purple-600 mt-4">
              {loading ? "..." : fornecedores.length}
            </p>
          </div>

          {/* Card: Status da Conexão */}
          <div className="p-8 bg-zinc-900 border border-purple-900/50 rounded-2xl shadow-2xl shadow-purple-500/5">
            <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Sistema</h2>
            <p className="text-xl font-black text-green-500 mt-6 uppercase">
              {loading ? "Sincronizando..." : "Online"}
            </p>
          </div>
        </section>

        <footer className="mt-24 pt-8 border-t border-zinc-900 text-center">
          <p className="text-zinc-700 text-[10px] uppercase tracking-[0.4em]">
            Desenvolvido por Mayara Soares | 2026
          </p>
        </footer>
      </main>
    </div>
  );
}