"use client";

import { useState, useEffect } from 'react';
import api from '../services/api'; // Conexão com o seu back-end

export default function RelatorioPage() {
  const [relatorio, setRelatorio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarRelatorio() {
      try {
        const response = await api.get('/associacoes');
        setRelatorio(response.data);
      } catch (error) {
        console.error("Erro ao gerar relatório:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarRelatorio();
  }, []);

  return (
    <div className="p-8 bg-zinc-950 min-h-screen text-white">
      {/* Título */}
      <div className="mb-10 border-b-2 border-purple-900/30 pb-6 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">
            RELATÓRIO DE <span className="text-purple-600">ESTOQUE</span>
          </h2>
          <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">Auditoria de Vínculos e Parceiros</p>
        </div>
        <button 
          onClick={() => window.print()} 
          className="text-[10px] border border-zinc-700 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all uppercase font-bold"
        >
          Imprimir PDF
        </button>
      </div>

      {/* Tabela de Auditoria */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-900/80 text-purple-500">
              <th className="p-5 uppercase text-[10px] font-black tracking-[0.2em] border-b border-zinc-800">Produto</th>
              <th className="p-5 uppercase text-[10px] font-black tracking-[0.2em] border-b border-zinc-800">Preço</th>
              <th className="p-5 uppercase text-[10px] font-black tracking-[0.2em] border-b border-zinc-800">Fornecedor Responsável</th>
              <th className="p-5 uppercase text-[10px] font-black tracking-[0.2em] border-b border-zinc-800">Contato</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {loading ? (
              <tr><td colSpan="4" className="p-20 text-center text-zinc-600 animate-pulse">Gerando relatório...</td></tr>
            ) : relatorio.length > 0 ? (
              relatorio.map((item, index) => (
                <tr key={index} className="hover:bg-purple-900/5 transition-colors">
                  <td className="p-5 font-bold text-zinc-100">{item.Produto?.nome}</td>
                  <td className="p-5 text-purple-400 font-mono text-sm">R$ {item.Produto?.preco}</td>
                  <td className="p-5 text-zinc-300 uppercase text-xs tracking-wider">{item.Fornecedor?.nome}</td>
                  <td className="p-5 text-zinc-500 italic text-xs">{item.Fornecedor?.contato}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" className="p-20 text-center text-zinc-700 italic">Nenhum dado vinculado para exibição no relatório.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}